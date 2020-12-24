# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Baterias(models.Model):
    amp = models.FloatField(blank=True, null=False, primary_key=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'baterias'


class Cidades(models.Model):
    id = models.IntegerField(primary_key=True)
    cidade = models.TextField(blank=True, null=True)
    uf = models.TextField(blank=True, null=True)
    long = models.FloatField(blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    sigla = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cidades'


class Controladores(models.Model):
    amp = models.FloatField(blank=True, null=False, primary_key=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'controladores'


class Inversores(models.Model):
    pot = models.FloatField(blank=True, null=False, primary_key=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inversores'


class Modulos(models.Model):
    pot = models.FloatField(blank=True, null=False, primary_key=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'modulos'


class Radiacao(models.Model):
    long = models.TextField(blank=True, null=True)
    lat = models.TextField(blank=True, null=True)
    jan = models.FloatField(blank=True, null=True)
    fev = models.FloatField(blank=True, null=True)
    mar = models.FloatField(blank=True, null=True)
    abr = models.FloatField(blank=True, null=True)
    mai = models.FloatField(blank=True, null=True)
    jun = models.FloatField(blank=True, null=True)
    jul = models.FloatField(blank=True, null=True)
    ago = models.FloatField(blank=True, null=True)
    sept = models.FloatField(blank=True, null=True)
    out = models.FloatField(blank=True, null=True)
    nov = models.FloatField(blank=True, null=True)
    dez = models.FloatField(blank=True, null=True)
    anual = models.FloatField(blank=True, primary_key=True)

    class Meta:
        managed = False
        db_table = 'radiacao'