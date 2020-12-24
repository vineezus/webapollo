from rest_framework import serializers
from django.utils.formats import sanitize_separators
from .models import Cidades
from .error_msgs import consum_errors, consum_og_errors, city_errors


class CitieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cidades
        fields = '__all__'

class ConfigOnSerializer(serializers.Serializer):
    mod = serializers.ChoiceField(choices=[250, 350])

class ConfigOffSerializer(serializers.Serializer):
    mod = serializers.ChoiceField(choices=[50, 100, 150])
    batt = serializers.ChoiceField(choices=[70, 100])
    ctr = serializers.ChoiceField(choices=[30, 60])

class OffSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True, min_value=1, max_value=5565, error_messages=city_errors)
    consum = serializers.FloatField(required=True, min_value=350, max_value=20000, error_messages=consum_errors)
    config = ConfigOffSerializer()

class OnSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True, min_value=1, max_value=5565, error_messages=city_errors)
    consum = serializers.FloatField(required=True, min_value=10, max_value=5000, error_messages=consum_og_errors)
    config = ConfigOnSerializer()


    
    