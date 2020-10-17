import math

def mod_weight(modqt, modpower, mode):
    if mode == 'off':
        mod_index = int((modpower/50)-1)
        mod_unilist = [4.9, 7.3, 11.25] #peso dos paineis (Em kg)
        modweight = mod_unilist[mod_index] * modpower
    else:
        mod_uni = 23.2
        modweight = mod_uni * modqt

    return modweight

def batt_weight(battqt, batt_amp):
    if batt_amp == 70:
        batt_weight = math.ceil(battqt * 14.7)
    else:
        batt_weight = math.ceil(battqt * 19)
        
    return batt_weight