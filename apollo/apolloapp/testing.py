from .models import Cidades

def discover_id():
    anan_id = Cidades.objects.filter(cidade='ANANINDEUA').values('id').get()
    anan_id = str(anan_id)

    print(anan_id)