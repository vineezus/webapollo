from django.db.models import Func, F
from .models import Cidades, Radiacao

def irradbyID(cityid):
    selectedcity = Cidades.objects.get(id=cityid)
    city_lat = round(float(selectedcity.lat.replace(",", ".")), 2)
    city_long = round(float(selectedcity.long.replace(",", ".")), 2)

    selected_coord = Radiacao.objects.annotate(abs_latdiff=Func(city_lat - F('lat'), function='ABS')).annotate(abs_longdiff=Func(city_long - F('long'), function='ABS')).order_by('abs_latdiff', 'abs_longdiff').first()
    rad = float(selected_coord.anual.replace(",", "."))

    return rad