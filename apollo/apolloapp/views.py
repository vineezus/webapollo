from rest_framework import views
from rest_framework.response import Response
from .serializers import OffSerializer, OnSerializer
from .sizing import sizing_cal
from .sizing_off import sizingoff_cal

# Create your views here.
class OffSizingView(views.APIView):

    def post(self, request, format=None):
        serializer = OffSerializer(data=request.data)
        if serializer.is_valid():
            config = serializer.data.get('config', None)
            id = serializer.data.get('id', None)
            consum = serializer.data.get('consum', None)
            
            ans = sizingoff_cal(config, id, consum)

            return Response(ans)

        else:
            return Response(serializer.errors)

class OnSizingView(views.APIView):

    def post(self, request, format=None):
        serializer = OnSerializer(data=request.data)
        if serializer.is_valid():
            config = serializer.data.get('config', None)
            id = serializer.data.get('id', None)
            consum = serializer.data.get('consum', None)
            
            ans = sizing_cal(config, id, consum)
            
            return Response(ans)

        else:
            return Response(serializer.errors)


