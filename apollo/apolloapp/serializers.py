from rest_framework import serializers

class GetSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    consum = serializers.FloatField()
    