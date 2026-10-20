#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build.py —— 把 src/ 下的脚本 + art/ 下的图片全部内联进一个自包含 HTML。

要点：
  * 图片转成 data:URI 再塞进 JS，而不是画到 canvas 时再去 fetch 本地文件。
    原因：file:// 下用 <img src="art/x.png"> 载入本地文件会把 canvas 标记为
    "污染"，之后 getImageData 会直接抛错 —— 而像素字体和无头验证都依赖它。
    data:URI 属于同源，不会污染画布。
  * 用经典 <script>，不能用 type="module"（file:// 下 CORS 会拒掉）。
  * 内联时必须把内容里的 </script> 拆开，否则会提前闭合标签。

用法：
    python build.py            # 生成 dist/index.html
    python build.py --dev      # 只校验，不写文件
"""
import base64
import io
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
ART = os.path.join(ROOT, 'art')
DIST = os.path.join(ROOT, 'dist')

ORDER = ['art-data.js', 'audio.js', 'art.js', 'story.js', 'ui.js', 'engine.js']

TARGETS = [('index.html', '主交付物：单文件，双击即玩')]


def read_text(p):
    with io.open(p, 'r', encoding='utf-8') as f:
        return f.read()


def gen_artdata():
    """把 art/*.png 转成 var ART_DATA = { name: 'data:image/png;base64,...' }"""
    names = sorted(n for n in os.listdir(ART) if n.endswith('.png') and not n.startswith('_'))
    parts = ['/* 自动生成：art/*.png 的 base64 内联。请勿手改，改图后重跑 build.py */',
             'var ART_DATA = {']
    total = 0
    for i, n in enumerate(names):
        with open(os.path.join(ART, n), 'rb') as f:
            b = f.read()
        total += len(b)
        b64 = base64.b64encode(b).decode('ascii')
        key = n[:-4]
        comma = ',' if i < len(names) - 1 else ''
        parts.append("  '%s': 'data:image/png;base64,%s'%s" % (key, b64, comma))
    parts.append('};')
    code = '\n'.join(parts) + '\n'
    out = os.path.join(SRC, 'art-data.js')
    with io.open(out, 'w', encoding='utf-8') as f:
        f.write(code)
    print('[素材] %d 张图，原始 %.1f KB → art-data.js %.1f KB'
          % (len(names), total / 1024.0, len(code.encode('utf-8')) / 1024.0))
    return names


def main():
    dev = '--dev' in sys.argv

    names = gen_artdata()
    if not names:
        print('[错误] art/ 里没有图片')
        return 1

    for n in ORDER:
        if not os.path.exists(os.path.join(SRC, n)):
            print('[错误] 缺少脚本：src/%s' % n)
            return 1

    html = read_text(os.path.join(ROOT, 'game.template.html'))
    total = 0
    for n in ORDER:
        code = read_text(os.path.join(SRC, n))
        total += len(code)
        marker = '<script src="src/%s"></script>' % n
        if marker not in html:
            print('[错误] index.html 里找不到占位：%s' % marker)
            return 1
        safe = code.replace('</script>', '<\\/script>')
        html = html.replace(marker, '<script>\n/* ==== %s ==== */\n%s\n</script>' % (n, safe))

    leftovers = html.count('<script src=') + html.count('<link ')
    if leftovers:
        print('[错误] 产物里还有 %d 处外部引用' % leftovers)
        return 1

    if not dev:
        with io.open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as entry:
            entry.write(html)

    size = len(html.encode('utf-8'))
    if dev:
        print('[dev] 校验通过：%d 个脚本，共 %d 字符，产物 %.1f KB，零外部引用'
              % (len(ORDER), total, size / 1024.0))
        return 0

    if not os.path.isdir(DIST):
        os.makedirs(DIST)
    for name, note in TARGETS:
        out = os.path.join(DIST, name)
        with io.open(out, 'w', encoding='utf-8') as f:
            f.write(html)
        print('[完成] %s  (%.1f KB)  %s' % (out, size / 1024.0, note))
    return 0


if __name__ == '__main__':
    sys.exit(main())
