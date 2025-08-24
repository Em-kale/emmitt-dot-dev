from core.graph.utils.graph_initializer import GraphInitializer


def get_graph(data):
    print(data)
    number_of_nodes = data.get('number_of_nodes')
    clustering_modifier = data.get('clustering_modifier')
    null_edge_probability = data.get('null_edge_probability')

    initializer = GraphInitializer(
        numberOfNodes=number_of_nodes, clusteringModifier=clustering_modifier,
        nullEdgeProbability=null_edge_probability)

    # Get random graph layout, processed by force directed algo
    graphLayout = initializer.get_graph_layout()

    # get adjacencyMatrix
    graph = initializer.get_graph()
    return graph.tolist(), graphLayout.tolist()
