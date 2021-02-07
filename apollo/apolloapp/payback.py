import math
from .selix import tax_selix
from .DolarDolarbillyaaall import dolar_data
from .tariff import tariff_sheriff
from functools import reduce

def thebigpayback(id, consum, invest, ongrid):

    tariff = tariff_sheriff(id)
    tariff_stat = tariff[1]
    tariff = tariff[0]

    pb = 0
    acc_vp = 0
    balance = (invest * -1)

    selix = (tax_selix()[0]/100)
    selix_stat = tax_selix()[1]

    list_pb = [[0, balance]]
    pb_append = list_pb.append
    
    dolar_var = dolar_data('1')
    dolar_var = dolar_var[0]

    pb_stat = True if (tariff_stat or selix_stat) else False

    if not ongrid:
        while balance < 0:
            pb += 1
            tariff = (tariff * 1.09)
            vp = ((tariff * (consum/1000) * (12*30)) / ((1 + selix) ** pb))
            acc_vp += vp
            balance += acc_vp
            pb_append([pb, math.ceil(balance)])
        else:
            for x in range(0, 2):
                pb += 1
                tariff = (tariff * 1.09 * dolar_var)
                vp = ((tariff * (consum/1000) * (12*30))/ ((1 + selix) ** pb))
                acc_vp += vp
                balance += acc_vp
                pb_append([pb, math.ceil(balance)])
    else:
        while balance < 0:
            pb += 1
            tariff = (tariff * 1.09)
            
            vp = (tariff * consum * 12 / ((1 + selix) ** pb))
            acc_vp += vp
            balance += acc_vp
            pb_append([pb, math.ceil(balance)])
        else:
            for x in range(0, 2):
                pb += 1
                tariff = (tariff * 1.09 * dolar_var)
                vp = ((tariff * consum * 12) / (1 + selix) ** pb)
                acc_vp += vp
                balance += acc_vp
                pb_append([pb, math.ceil(balance)])

    return pb, list_pb, pb_stat