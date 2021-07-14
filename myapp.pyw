#! c:\\Users\\aditya\\AppData\\Local\\Programs\\Python\\Python39\\pythonw.exe

import sys
from PyQt5.QtWidgets import QApplication
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtCore import *
app = QApplication(sys.argv)

web = QWebEngineView()
web.load(QUrl("http://192.168.1.201:8000/"))
web.showMaximized()

sys.exit(app.exec_())
