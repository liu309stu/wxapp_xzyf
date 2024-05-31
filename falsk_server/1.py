# a = "8'h1  : fre_reg <= 8'h"
# print(a.split())
# for i in range(1,100):
#     s = "8'd"+ str(i) +' : fre_reg <= 8\'h' + str(int(1000 * i/ 1024)) +';'
#     print(s)
# a =" image/40.png image/41.png image/42.png"
# # print(a.split())

a = "   153.png 154.png 155.png 156.png 157.png 158.png 159.png 160.png"

list = a.split()
s = ' '
for i in list:
    s  = s +' image/'+i
print(s)