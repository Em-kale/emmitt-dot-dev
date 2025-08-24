from core.graph.utils.graph_initializer import GraphInitializer


def get_graph(data):
    print(data)
    initializer = GraphInitializer(numberOfNodes=data.get('number_of_nodes'))
    # Get random graph layout, processed by force directed algo
    graphLayout = initializer.get_graph_layout()

    # get adjacencyMatrix
    graph = initializer.get_graph()
    return graph.tolist(), graphLayout.tolist()
