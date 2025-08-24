from core import app
from core.graph.graph_service import get_graph
from flask import request


@app.route("/get-graph", methods=["GET", "POST"])
def getGraphs():
    if request.method == 'POST':
        json_data = request.json

    graph, layout = get_graph(json_data)
    return {"graph": graph, "layout": layout}
