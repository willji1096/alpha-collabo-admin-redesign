#!/usr/bin/env python3
"""알파콜라보 어드민 — 무캐시 정적 서버.
모든 응답에 Cache-Control: no-store를 붙여, 편집 즉시 반영되고
components.js·페이지 HTML이 옛 버전으로 캐시되는 문제를 막는다.
사용: python3 serve.py [PORT]   (기본 8777)
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass  # 조용히


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8777
    httpd = ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler)
    print(f"무캐시 서버 실행 중 → http://localhost:{port}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.shutdown()
