//Sistema para crear páginas según el slug de cada habitación

exports.createPages = async ({actions, graphql, reporter}) => {
    const resultado = await graphql(`
        query {
            allDatoCmsHabitacion {
                nodes {
                    slug
                }
            }
        }`
    )

    if (resultado.errors) {
        reporter.panic(`No hubo resultados`, resultado.errors)
    }

    const habitaciones = resultado.data.allDatoCmsHabitacion.nodes

    habitaciones.forEach(habitacion => {
        actions.createPage({
            path: habitacion.slug,
            component: require.resolve('./src/components/habitaciones.js'),
            context: { // El sistema enviará el slug de la habitación a la página (habitaciones.js)
                slug: habitacion.slug
            }
        })
    })
}