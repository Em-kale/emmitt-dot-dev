from core import app
from core.graph.graph_service import get_graph


@app.route("/get-graph", methods=["GET", "POST"])
def getGraphs():
    graph, layout = get_graph()
    return {"graph": graph, "layout": layout}
