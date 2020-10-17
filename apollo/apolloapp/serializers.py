from rest_framework import serializers

class ConfigOnSerializer(serializers.Serializer):
    mod = serializers.ChoiceField(choices=[250, 350])

class ConfigOffSerializer(serializers.Serializer):
    mod = serializers.ChoiceField(choices=[50, 100, 150])
    batt = serializers.ChoiceField(choices=[70, 100])
    ctr = serializers.ChoiceField(choices=[30, 60])

class OffSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    consum = serializers.FloatField()
    config = ConfigOffSerializer()

class OnSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    consum = serializers.FloatField()
    config = ConfigOnSerializer()


    
    