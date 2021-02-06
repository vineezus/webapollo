dol_stat = True
pb_stat = True
both_equal = True if (dol_stat == pb_stat) else False

#True - False - False => Valores de Payback     (X)
#False - True - False => Valsores de Custo      (X)
#False - False - True => Ambos                  (X)
#True - True - True => Null                     ()

if (both_equal == False):
    text = ("Os valores de " + ("Custo", "Payback")[dol_stat] + " podem estar defasados neste dimensionamento")
else:
    text = ("Os valores de Custo e Payback podem estar defasados neste dimensionamento",
            False)[dol_stat]

print(text)