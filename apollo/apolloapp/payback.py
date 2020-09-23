from .selix import tax_selix
from .DolarDolarbillyaaall import dolar_data
from .tariff import tariff_sheriff
from functools import reduce

def thebigpayback(id, consum, invest):

    tariff = tariff_sheriff(sig)

    pb = 0
    acc_vp = 0
    balance = (invest * -1)

    selix = (tax_selix()[0]) / 100

    list_pb = [[0, balance]]
    pb_append = list_pb.append
    
    dolar_var = dolar_data('1')
    dolar_var = dolar_var[0]

    while balance < 0:
        pb += 1
        tariff = (tariff * 1.09 * dolar_var)
        vp = ((tariff * consum * 12) / (1 + selix) ** pb)
        acc_vp += vp
        balance += acc_vp
        pb_append([pb, balance])
    else:
        for x in range(0, 2):
            pb += 1
            tariff = (tariff * 1.09 * dolar_var)
            vp = ((tariff * consum * 12) / (1 + selix) ** pb)
            acc_vp += vp
            balance += acc_vp
            pb_append([pb, balance])

    return pb, list_pb