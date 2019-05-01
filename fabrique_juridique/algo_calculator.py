import datetime

def calc_ancienete(date_de_debut, date_de_fin):
    return (date_de_fin.year - date_de_debut.year) * 12 + date_de_fin.month - date_de_debut.month

def calc_moyenne(salaires):
    nb_salaires = len(salaires)
    remuneration_total = 0
    for s in salaires:
        remuneration_total += s
    return remuneration_total / nb_salaires
    