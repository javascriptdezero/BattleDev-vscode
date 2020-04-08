# -*- coding: utf-8 -*-
"""
Created on Wed Apr  8 12:10:53 2020

@author: enzo
"""

with open ("input4.txt","r") as f:
    l=f.readlines()
l=[i.split()[0] for i in l]
s=set(l)
s=list(s)
while not len(s)==2:
    for elem in s:
        l.remove(elem)
    s=set(l)
    s=list(s)
print(s)


