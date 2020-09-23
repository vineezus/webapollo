import math

def mod_weight(modlist):
    #peso da dos paineis (Em kg)

    mod_uniweight_list = [4.9, 7.3, 11.25, 23.2, 23.2]

    mod_weight_list = []
    for q, w in zip(modlist, mod_uniweight_list):
        mod_weight_list.append(math.ceil(q * w))

    return mod_weight_list

def batt_weight(battlist):

    batt_uniweight_list = [14.7, 19]

    batt_weight_list = []
    for qtt in battlist:
        if battlist.index(qtt) <= 2:
            batt_weight_list.append(math.ceil(qtt * batt_uniweight_list[0]))
        else:
            batt_weight_list.append(math.ceil(qtt * batt_uniweight_list[1]))
        
    return batt_weight_list