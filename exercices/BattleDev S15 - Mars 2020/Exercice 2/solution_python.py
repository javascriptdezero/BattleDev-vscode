# -*- coding: utf-8 -*-
"""
Created on Sun Apr 12 11:13:50 2020

@author: enzo
"""


with open ("input3.txt","r") as f:
    l=f.readlines()
l=[i.split()[0] for i in l]
del l[0]
p='x'
val=1
d=dict.fromkeys(set(l), 0)
for i in l:
    if i==p:
        val+=1
    else:
        val=1
    if d[i] < val:
        d[i]=val 
    p=i
max_value = max(d.values())
print(max_value)

    