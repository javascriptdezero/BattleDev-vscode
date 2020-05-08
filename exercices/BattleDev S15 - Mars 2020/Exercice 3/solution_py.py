# -*- coding: utf-8 -*-
"""
Created on Mon Apr 27 16:10:01 2020

@author: enzo
"""

with open ("input4.txt","r") as f:
    l=f.readlines()
l=[i.rstrip()  for i in l]
j={}
m=[False for i in range(8*60)]
m.extend([True for i in range(10*60)])
m.extend([False for i in range(6*60)])
for i in range(1,6):
    j[i]=m.copy()
    
for cr in l[1:]:   
    for i in range(int(cr[2:4])*60+int(cr[5:7]),int(cr[8:10])*60+int(cr[11:13])+1):
        j[int(cr[0])][i]=False
p=0
for k,v in j.items():
    for index,i in enumerate(v):
        if i:
            p+=1
            minute = index
            if p==60:
                break
        else :
            p=0
    if p==60:
        break
heure=minute//60
minute=minute%60
Aminute=minute-59
if Aminute<0 :
    Aminute=minute
    Aheure=heure-1
else:
    Aheure=heure
print(k,' ',Aheure,':',Aminute,'--',heure,':',minute)



