from rest_framework import views
from rest_framework.response import Response
from .serializers import GetSerializer
from .sizing import sizing_cal

# Create your views here.
class SizingView(views.APIView):

    def get(self, request):
        serializer = GetSerializer(data=request.data)
        if serializer.is_valid():
            id = serializer.data.get('id', None)
            consum = serializer.data.get('consum', None)

            ans = sizing_cal(id, consum)

            return Response(ans)

        else:
            return Response(serializer.errors)
