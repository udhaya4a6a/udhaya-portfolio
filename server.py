#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
import time

PORT = 3000
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

Handler = MyHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"✓ Server running at http://localhost:{PORT}")
        print(f"✓ Open the URL in your browser")
        print(f"✓ Press Ctrl+C to stop the server")
        
        # Open browser after a short delay
        time.sleep(1)
        webbrowser.open(f'http://localhost:{PORT}')
        
        httpd.serve_forever()
except OSError:
    print(f"✗ Port {PORT} is already in use. Trying port {PORT + 1}...")
    PORT += 1
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"✓ Server running at http://localhost:{PORT}")
        time.sleep(1)
        webbrowser.open(f'http://localhost:{PORT}')
        httpd.serve_forever()
