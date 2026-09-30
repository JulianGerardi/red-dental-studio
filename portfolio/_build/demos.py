"""Micro-animations: one interaction per screen that shows how something works.

Each entry is keyed by image name. r = (x, y, w, h) of the target, in % of the
screenshot. Kinds:
  click  cursor moves to the target, clicks, the target lights up
  tap    same on a phone, with a finger instead of a cursor
  type   click on a field and the text types itself (bg/fg cover the placeholder)
  draw   the cursor draws a rectangle (a geofence)
  scan   a line scans the target (what the model watched)
  rows   the highlight walks down n rows, dy apart
  sweep  a band of light crosses the whole screen (a flow)
"""

DEMOS = {
    # ---------- Batech ----------
    "b-dashboard": dict(k="click", r=(45.7, 12.4, 24.8, 10.9), en="Detections across every camera", es="Detecciones de todas las cámaras"),
    "b-eventos": dict(k="click", r=(58.4, 13.4, 15.2, 3.6), en="Filter events by detection type", es="Filtrar eventos por tipo de detección"),
    "b-geocerca": dict(k="draw", r=(58.0, 43.5, 22.0, 15.0), en="Drawing the geofence on the video", es="Dibujando la geocerca sobre el video"),
    "b-resultado": dict(k="scan", r=(46.0, 28.2, 19.2, 23.5), en="The area the model watched", es="El área que miró el modelo"),
    "b-ai": dict(k="type", r=(67.9, 73.9, 28.5, 3.3), bg="#151515", fg="#e5e5e5",
                 text=("Which branch had the most events?", "¿Qué sucursal tuvo más eventos?"), en="Ask Batech AI", es="Preguntale a Batech AI"),
    "b-confirm": dict(k="click", r=(54.2, 54.2, 12.6, 2.3), en="Confirm and start the analysis", es="Confirmar e iniciar el análisis"),
    "b-analisis": dict(k="rows", r=(78.0, 35.0, 9.6, 3.0), dy=4.87, en="Status in colour: retry, error, active", es="Estado en color: reintento, error, activo"),
    "b-operativos": dict(k="click", r=(38.4, 16.8, 14.0, 3.5), en="Filter by % against the expected time", es="Filtrar por % contra el tiempo esperado"),
    "b-login": dict(k="type", r=(34.3, 56.6, 28.0, 2.9), bg="#303030", fg="#e5e5e5",
                    text=("kim@batech.mx", "kim@batech.mx"), en="Sign in with email", es="Ingreso con email"),
    "b-flow": dict(k="sweep", r=(0, 0, 100, 100), en="From the source to the report", es="De la fuente al reporte"),

    # ---------- Confidentally ----------
    "d-login": dict(k="type", r=(61.8, 44.4, 24.0, 3.3), bg="#ffffff", fg="#171717",
                    text=("sarah@reddental.com", "sarah@reddental.com"), en="Sign in to the clinic", es="Ingreso a la clínica"),
    "d-dashboard": dict(k="click", r=(7.6, 58.1, 26.3, 4.8), en="Check a patient out in one click", es="Dar salida a un paciente con un clic"),
    "d-patient": dict(k="click", r=(6.9, 45.9, 12.7, 3.9), en="Start the encounter from the record", es="Iniciar la consulta desde la ficha"),
    "d-clinical": dict(k="click", r=(41.2, 20.5, 3.3, 15.4), en="Chart findings tooth by tooth", es="Registrar hallazgos diente por diente"),
    "d-scheduling": dict(k="click", r=(87.8, 24.8, 10.5, 3.5), en="Book an appointment in two steps", es="Dar un turno en dos pasos"),
    "d-patients": dict(k="type", r=(8.0, 28.9, 18.5, 2.7), bg="#ffffff", fg="#171717",
                       text=("Abril", "Abril"), en="Find a patient by name", es="Buscar un paciente por nombre"),
    "d-billing": dict(k="click", r=(57.0, 16.3, 11.5, 3.9), en="Post a payment over the ledger", es="Registrar un pago sobre la cuenta"),
    "d-ledger": dict(k="click", r=(81.0, 93.4, 9.2, 3.1), en="Apply an unapplied credit", es="Aplicar un crédito disponible"),
    "d-notifications": dict(k="click", r=(18.8, 24.8, 6.6, 3.4), en="Pending: notifications that are tasks", es="Pendientes: notificaciones que son tareas"),
    "d-crop-apptcard": dict(k="click", r=(3.7, 74.3, 92.2, 19.9), en="Check out", es="Dar salida"),
    "d-m-dashboard": dict(k="tap", r=(11.2, 75.0, 77.6, 5.1), en="Check out from the phone", es="Dar salida desde el celular"),
    "d-m-patient": dict(k="tap", r=(8.6, 34.6, 82.8, 4.0), en="Start the encounter", es="Iniciar la consulta"),
    "d-m-scheduling": dict(k="tap", r=(4.0, 35.0, 39.0, 3.6), en="New appointment", es="Nuevo turno"),

    # ---------- Confidentally UI ----------
    "ds-welcome": dict(k="type", r=(31.3, 43.7, 38.0, 3.9), bg="#ffffff", fg="#171717",
                       text=("turno", "turno"), en="The search understands Spanish", es="El buscador entiende español"),
    "ds-components": dict(k="click", r=(1.6, 28.0, 16.6, 3.2), en="128 pieces grouped by module", es="128 piezas agrupadas por módulo"),
    "ds-buttons": dict(k="click", r=(41.4, 42.7, 18.0, 13.6), en="Usage counted in the code", es="Uso contado en el código"),
    "ds-appt-cards": dict(k="click", r=(61.4, 52.4, 9.4, 2.4), en="The decisions behind it", es="Las decisiones detrás"),
    "ds-search": dict(k="rows", r=(28.6, 50.2, 43.2, 6.2), dy=6.9, en="Results for “turno”", es="Resultados para “turno”"),
    "ds-builder-built": dict(k="click", r=(90.8, 63.8, 5.8, 3.6), en="Describe it and the screen gets built", es="Lo describís y la pantalla se arma"),
    "ds-audit": dict(k="click", r=(48.5, 51.0, 22.4, 19.6), en="Duplicates measured by scripts", es="Duplicados medidos con scripts"),
    "ds-colors": dict(k="rows", r=(22.4, 58.9, 56.3, 5.6), dy=6.5, en="Each token, light and dark", es="Cada token, claro y oscuro"),
    "ds-crop-describe": dict(k="rows", r=(3.0, 26.5, 93.0, 9.5), dy=11.7, en="The Builder explains each step", es="El Builder explica cada paso"),

    # ---------- GRILL ----------
    "g-emp-app": dict(k="click", r=(21.6, 53.0, 15.5, 2.8), en="Choose the day’s dish", es="Elegir el plato del día"),
    "g-crop-modal": dict(k="type", r=(5.8, 72.8, 60.0, 3.4), bg="#ffffff", fg="#171717",
                         text=("no salt, please", "sin sal, por favor"), en="A note for the kitchen", es="Una nota para la cocina"),
    "g-emp-historial": dict(k="click", r=(63.3, 10.7, 11.6, 2.9), en="Download the week’s summary", es="Descargar el resumen de la semana"),
    "g-corp-hoy": dict(k="click", r=(27.9, 29.4, 20.0, 13.2), en="One card per job of the morning", es="Una tarjeta por tarea de la mañana"),
    "g-corp-dark-cocina": dict(k="rows", r=(27.8, 28.9, 62.2, 6.2), dy=6.35, en="Tick each dish as it’s cooked", es="Tildar cada plato al cocinarlo"),
    "g-corp-cocina": dict(k="click", r=(82.8, 10.9, 7.2, 3.0), en="Print the day’s ticket", es="Imprimir la comanda del día"),
    "g-corp-etiquetas": dict(k="click", r=(28.4, 56.6, 6.6, 1.9), en="Start from the first free label", es="Empezar desde la primera etiqueta libre"),
    "g-corp-reparto": dict(k="rows", r=(32.6, 31.8, 53.4, 4.6), dy=4.88, en="Check off each tray at the stop", es="Tildar cada bandeja en la parada"),
    "g-corp-pedidos": dict(k="click", r=(75.5, 49.9, 12.3, 3.5), en="Move each order through its status", es="Cambiar el estado de cada pedido"),
    "g-emp-login": dict(k="type", r=(58.9, 36.6, 28.0, 3.3), bg="#f5f3ef", fg="#171717",
                        text=("maria@elmercedino.com", "maria@elmercedino.com"), en="Sign in with the company email", es="Ingreso con el mail de la empresa"),
    "g-corp-login": dict(k="type", r=(59.2, 48.0, 28.0, 3.3), bg="#f5f3ef", fg="#171717",
                         text=("admin@grill.com.ar", "admin@grill.com.ar"), en="Internal access for the kitchen", es="Acceso interno de la cocina"),
    "g-crop-label": dict(k="scan", r=(3.0, 18.0, 94.0, 66.0), en="70 × 25.4 mm labels", es="Etiquetas de 70 × 25,4 mm"),
    "g-emp-m-app": dict(k="tap", r=(9.0, 68.6, 82.0, 3.0), en="Choose the dish", es="Elegir el plato"),
    "g-emp-m-carta": dict(k="tap", r=(5.2, 34.1, 25.8, 3.5), en="Filter gluten-free", es="Filtrar sin TACC"),
    "g-emp-m-dark-app": dict(k="tap", r=(67.4, 1.3, 9.0, 4.0), en="Dark mode", es="Modo oscuro"),

    # ---------- Mercado Play ----------
    "mp-cover": dict(k="click", r=(3.0, 35.5, 37.0, 12.5), en="Alert Dialog, selected", es="Alert Dialog, seleccionado"),
}


def _pct(v):
    return f"{round(v, 2)}%"


def demo_html(name, w, h, T):
    d = DEMOS.get(name)
    if not d:
        return ""
    x, y, rw, rh = d["r"]
    k = d["k"]
    cx, cy = x + rw / 2, y + rh / 2
    # cursor enters from the lower right of the target (or the upper left near the edges)
    sx = cx + 24 if cx + 24 < 94 else cx - 26
    sy = cy + 22 if cy + 22 < 94 else cy - 24
    below = y + rh < 76 and k != "rows"
    if k == "sweep":
        below, y, rh = True, 0, 80
    tx = min(max(cx, 18), 82)
    ty = y + rh if below else y
    style = [f"--x:{_pct(x)}", f"--y:{_pct(y)}", f"--w:{_pct(rw)}", f"--h:{_pct(rh)}",
             f"--cx:{_pct(cx)}", f"--cy:{_pct(cy)}", f"--sx:{_pct(sx)}", f"--sy:{_pct(sy)}",
             f"--tx:{_pct(tx)}", f"--ty:{_pct(ty)}"]
    if k == "rows":
        style.append(f"--dy:{_pct(d['dy'])}")
    inner = '<i class="demo__hl"></i>'
    if k in ("click", "type", "draw"):
        inner += '<i class="demo__rip"></i><i class="demo__cur"></i>'
    if k == "tap":
        inner += '<i class="demo__rip"></i><i class="demo__dot"></i>'
    if k == "scan":
        inner = '<i class="demo__hl"><i class="demo__line"></i></i>'
    if k == "sweep":
        inner = '<i class="demo__sweep"></i>'
    if k == "type":
        fs = round(rh * (h / w) * 0.52, 3)
        te, ts = d["text"]
        inner += (f'<i class="demo__type" style="--bg:{d["bg"]};--fg:{d["fg"]};--fs:{fs}cqw">'
                  f'<i class="demo__txt">{T(te, ts)}</i></i>')
    tag = f'<b class="demo__tag demo__tag--{"b" if below else "t"}">{T(d["en"], d["es"])}</b>'
    return f'<span class="demo demo--{k}" style="{";".join(style)}" aria-hidden="true">{inner}{tag}</span>'
