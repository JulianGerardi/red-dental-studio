"""Micro-animations: one small interaction per screen, drawn in the product's own UI.

No fake cursors. Each screen shows what the product would show: a pulse on the
control that was used, a toast with the feedback, a field that types itself,
a row that gets selected. Colours come from each product (see .demo--<brand>
in site.css).

r = (x, y, w, h) of the target, in % of the screenshot. Kinds:
  press  pulse on a control + toast
  type   the field types itself (bg/fg cover the placeholder) + toast
  draw   a dashed area grows (a geofence) + toast
  scan   a line sweeps an area + toast
  rows   the selection walks down rows dy apart + toast
en/es is the toast copy.
"""

DEMOS = {
    # ---------- Batech ----------
    "b-dashboard": dict(k="press", r=(45.7, 12.4, 24.8, 10.9), en="Live · all cameras", es="En vivo · todas las cámaras"),
    "b-eventos": dict(k="press", r=(58.4, 13.4, 15.2, 3.6), en="Filter applied", es="Filtro aplicado"),
    "b-geocerca": dict(k="draw", r=(58.0, 43.5, 22.0, 15.0), en="Geofence saved", es="Geocerca guardada"),
    "b-resultado": dict(k="scan", r=(46.0, 28.2, 19.2, 23.5), en="Analysing area", es="Analizando el área"),
    "b-ai": dict(k="type", r=(67.9, 73.9, 28.5, 3.3), bg="#151515", fg="#e5e5e5",
                 text=("Which branch had the most events?", "¿Qué sucursal tuvo más eventos?"), en="Batech AI is thinking…", es="Batech AI está pensando…"),
    "b-confirm": dict(k="press", r=(54.2, 54.2, 12.6, 2.3), en="Analysis started", es="Análisis iniciado"),
    "b-analisis": dict(k="rows", r=(78.0, 35.0, 9.6, 3.0), dy=4.87, en="Status updated", es="Estado actualizado"),
    "b-operativos": dict(k="press", r=(38.4, 16.8, 14.0, 3.5), en="Sorted by % of expected time", es="Ordenado por % del tiempo esperado"),
    "b-login": dict(k="type", r=(34.3, 56.6, 28.0, 2.9), bg="#303030", fg="#e5e5e5",
                    text=("kim@batech.mx", "kim@batech.mx"), en="Signing in…", es="Ingresando…"),

    # ---------- Confidentally ----------
    "d-login": dict(k="type", r=(61.8, 44.4, 24.0, 3.3), bg="#ffffff", fg="#171717",
                    text=("sarah@reddental.com", "sarah@reddental.com"), en="Welcome back, Sarah", es="Hola de nuevo, Sarah"),
    "d-dashboard": dict(k="press", r=(7.6, 58.1, 26.3, 4.8), en="Noah James checked out", es="Noah James salió de la consulta"),
    "d-patient": dict(k="press", r=(6.9, 45.9, 12.7, 3.9), en="Encounter started", es="Consulta iniciada"),
    "d-clinical": dict(k="press", r=(41.2, 20.5, 3.3, 15.4), en="Tooth 3 · caries charted", es="Diente 3 · caries registrada"),
    "d-scheduling": dict(k="press", r=(87.8, 24.8, 10.5, 3.5), en="New appointment · step 1 of 2", es="Nuevo turno · paso 1 de 2"),
    "d-patients": dict(k="type", r=(8.0, 28.9, 18.5, 2.7), bg="#ffffff", fg="#171717",
                       text=("Abril", "Abril"), en="1 patient found", es="1 paciente encontrado"),
    "d-billing": dict(k="press", r=(57.0, 16.3, 11.5, 3.9), en="Payment posted", es="Pago registrado"),
    "d-ledger": dict(k="press", r=(81.0, 93.4, 9.2, 3.1), en="$150.00 credit applied", es="Crédito de $150,00 aplicado"),
    "d-notifications": dict(k="press", r=(18.8, 24.8, 6.6, 3.4), en="2 pending tasks", es="2 tareas pendientes"),
    "d-crop-apptcard": dict(k="press", r=(3.7, 74.3, 92.2, 19.9), en="Checked out", es="Salida registrada"),
    "d-m-dashboard": dict(k="press", r=(11.2, 75.0, 77.6, 5.1), en="Checked out", es="Salida registrada"),
    "d-m-patient": dict(k="press", r=(8.6, 34.6, 82.8, 4.0), en="Encounter started", es="Consulta iniciada"),
    "d-m-scheduling": dict(k="press", r=(4.0, 35.0, 39.0, 3.6), en="New appointment", es="Nuevo turno"),

    # ---------- Confidentally UI ----------
    "ds-welcome": dict(k="type", r=(31.3, 43.7, 38.0, 3.9), bg="#ffffff", fg="#171717",
                       text=("turno", "turno"), en="8 results", es="8 resultados"),
    "ds-components": dict(k="press", r=(1.6, 28.0, 16.6, 3.2), en="Clinical · 39 pieces", es="Clinical · 39 piezas"),
    "ds-buttons": dict(k="press", r=(41.4, 42.7, 18.0, 13.6), en="Used in 10 files", es="Usado en 10 archivos"),
    "ds-appt-cards": dict(k="press", r=(61.4, 52.4, 9.4, 2.4), en="12 design decisions", es="12 decisiones de diseño"),
    "ds-search": dict(k="rows", r=(28.6, 50.2, 43.2, 6.2), dy=6.9, en="↵ to open", es="↵ para abrir"),
    "ds-builder-built": dict(k="press", r=(90.8, 63.8, 5.8, 3.6), en="Screen built · 3 blocks", es="Pantalla armada · 3 bloques"),
    "ds-audit": dict(k="press", r=(48.5, 51.0, 22.4, 19.6), en="Duplicates measured", es="Duplicados medidos"),
    "ds-colors": dict(k="rows", r=(22.4, 58.9, 56.3, 5.6), dy=6.5, en="Token copied", es="Token copiado"),
    "ds-crop-describe": dict(k="rows", r=(3.0, 26.5, 93.0, 9.5), dy=11.7, en="Building the screen", es="Armando la pantalla"),

    # ---------- GRILL ----------
    "g-emp-app": dict(k="press", r=(21.6, 53.0, 15.5, 2.8), en="Milanesa added · $10.800", es="Milanesa agregada · $10.800"),
    "g-crop-modal": dict(k="type", r=(5.8, 72.8, 60.0, 3.4), bg="#ffffff", fg="#171717",
                         text=("no salt, please", "sin sal, por favor"), en="Note for the kitchen", es="Nota para la cocina"),
    "g-emp-historial": dict(k="press", r=(63.3, 10.7, 11.6, 2.9), en="Summary downloaded", es="Resumen descargado"),
    "g-corp-hoy": dict(k="press", r=(27.9, 29.4, 20.0, 13.2), en="15 dishes to cook", es="15 platos para cocinar"),
    "g-corp-dark-cocina": dict(k="rows", r=(27.8, 28.9, 62.2, 6.2), dy=6.35, en="Dish ready", es="Plato listo"),
    "g-corp-cocina": dict(k="press", r=(82.8, 10.9, 7.2, 3.0), en="Printing ticket…", es="Imprimiendo comanda…"),
    "g-corp-etiquetas": dict(k="press", r=(28.4, 56.6, 6.6, 1.9), en="Starting from label 9", es="Empezando desde la etiqueta 9"),
    "g-corp-reparto": dict(k="rows", r=(32.6, 31.8, 53.4, 4.6), dy=4.88, en="Tray delivered", es="Bandeja entregada"),
    "g-corp-pedidos": dict(k="press", r=(75.5, 49.9, 12.3, 3.5), en="Order in preparation", es="Pedido en preparación"),
    "g-emp-login": dict(k="type", r=(58.9, 36.6, 28.0, 3.3), bg="#f5f3ef", fg="#171717",
                        text=("maria@elmercedino.com", "maria@elmercedino.com"), en="Signing in…", es="Ingresando…"),
    "g-corp-login": dict(k="type", r=(59.2, 48.0, 28.0, 3.3), bg="#f5f3ef", fg="#171717",
                         text=("admin@grill.com.ar", "admin@grill.com.ar"), en="Internal access", es="Acceso interno"),
    "g-crop-label": dict(k="scan", r=(3.0, 18.0, 94.0, 66.0), en="70 × 25.4 mm", es="70 × 25,4 mm"),
    "g-emp-m-app": dict(k="press", r=(9.0, 68.6, 82.0, 3.0), en="Added to your order", es="Agregado a tu pedido"),
    "g-emp-m-carta": dict(k="press", r=(5.2, 34.1, 25.8, 3.5), en="Gluten-free · 14 dishes", es="Sin TACC · 14 platos"),
    "g-emp-m-dark-app": dict(k="press", r=(67.4, 1.3, 9.0, 4.0), en="Dark mode on", es="Modo oscuro activado"),

    # ---------- Mercado Play ----------
    "mp-home": dict(k="press", r=(37.3, 14.8, 2.9, 1.0), en="Added to My favourites", es="Agregada a Mis favoritos"),
    "mp-recos": dict(k="press", r=(31.7, 56.2, 2.6, 2.0), en="Link ready to share", es="Enlace listo para compartir"),
    "mp-points": dict(k="rows", r=(65.6, 3.35, 19.0, 1.75), dy=1.87, en="+213 Mercado Envíos points", es="+213 puntos Mercado Envíos"),
    "mp-share": dict(k="press", r=(39.3, 12.3, 21.1, 0.85), en="Link copied", es="Enlace copiado"),
    "mp-fav": dict(k="press", r=(36.6, 14.7, 2.8, 1.05), en="Saved", es="Guardada"),
    "mp-lofi": dict(k="scan", r=(4.5, 3.1, 90.7, 15.8), en="Structure before colour", es="Estructura antes del color"),
    "mp-kit-modal": dict(k="type", r=(8.0, 70.2, 64.0, 5.0), bg="#2c2c2c", fg="#e5e5e5",
                         text=("guido@mail.com", "guido@mail.com"), en="Ready to send", es="Listo para enviar"),
    "mp-kit-modal-on": dict(k="press", r=(76.9, 69.6, 16.6, 6.3), en="Recommendation sent", es="Recomendación enviada"),
    "mp-kit-sent": dict(k="press", r=(41.7, 28.4, 20.0, 33.3), en="+100 MercadoPlay points", es="+100 puntos MercadoPlay"),
    "mp-kit-comments": dict(k="type", r=(19.5, 92.4, 50.0, 2.6), bg="#252322", fg="#e5e5e5",
                            text=("Great movie!", "¡Gran peli!"), en="Comment posted", es="Comentario publicado"),
    "mp-kit-card": dict(k="press", r=(69.3, 2.1, 12.0, 6.6), en="Saved", es="Guardada"),
    "mp-kit-card-saved": dict(k="press", r=(81.0, 2.1, 12.0, 6.6), en="Share this film", es="Compartí esta peli"),
    "mp-cover": dict(k="press", r=(3.0, 35.5, 37.0, 12.5), en="Alert Dialog · selected", es="Alert Dialog · seleccionado"),
}

BRAND = {"b-": "batech", "ds-": "ds", "d-": "dental", "g-": "grill", "mp-": "mp"}
DARK = {"g-corp-dark-cocina", "g-emp-m-dark-app"}
ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8"/><path d="M4.6 8.3l2.2 2.2 4.6-4.8"/></svg>'


def _pct(v):
    return f"{round(v, 2)}%"


def _brand(name):
    for pre, b in BRAND.items():
        if name.startswith(pre):
            return b + ("-dk" if name in DARK else "")
    return "dental"


def demo_html(name, w, h, T):
    d = DEMOS.get(name)
    if not d:
        return ""
    x, y, rw, rh = d["r"]
    k = d["k"]
    cx, cy = x + rw / 2, y + rh / 2
    below = y + rh < 78 and k != "rows"
    tx = min(max(cx, 16), 84)
    ty = y + rh if below else y
    if k == "rows":
        ty = y + d["dy"] * 3 + rh
        below = ty < 88
        if not below:
            ty = y
    style = [f"--x:{_pct(x)}", f"--y:{_pct(y)}", f"--w:{_pct(rw)}", f"--h:{_pct(rh)}",
             f"--cx:{_pct(cx)}", f"--cy:{_pct(cy)}", f"--tx:{_pct(tx)}", f"--ty:{_pct(ty)}"]
    if k == "rows":
        style.append(f"--dy:{_pct(d['dy'])}")
    inner = '<i class="demo__hl"></i>'
    if k == "scan":
        inner = '<i class="demo__hl"><i class="demo__line"></i></i>'
    if k == "draw":
        inner = '<i class="demo__hl"><i class="demo__knob"></i></i>'
    if k == "type":
        fs = round(rh * (h / w) * 0.52, 3)
        te, ts = d["text"]
        n = max(len(te), len(ts))
        inner = (f'<i class="demo__type" style="--bg:{d["bg"]};--fg:{d["fg"]};--fs:{fs}cqw;--n:{n}">'
                 f'<i class="demo__txt">{T(te, ts)}</i></i>')
    tag = f'<b class="demo__tag demo__tag--{"b" if below else "t"}">{ICON}<span>{T(d["en"], d["es"])}</span></b>'
    return f'<span class="demo demo--{k} demo--{_brand(name)}" style="{";".join(style)}" aria-hidden="true">{inner}{tag}</span>'
