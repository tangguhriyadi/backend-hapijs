const routes = [
    {
        method:'GET',
        path:'/',
        handler:(req, res) => {
            return `Hello Server !`
        }
    },
    {
        method:'GET',
        path:'/about',
        handler:(req, res) => `Halaman About !`
    },
    {
        method:'GET',
        path:'/{any*}',
        handler:(req, res) => `Forbidden !`
    },
    {
        method:'POST',
        path:'/posting',
        handler:(req, res) => {
            const {title, content, createdAt} = req.payload
            
            return `
                ${title},
                ${content},
                ${createdAt}
            `
        }
    },
    {
        method:'POST',
        path:'/posting2',
        handler:(req, res) => {
            const {title, content, createdAt} = req.payload
            
           return res.response({
            status: 'success',
            data:{
                judul:title,
                desc:content,
                createdAt:createdAt
            }
           }).code(200)
        }
    },
    {
        method:'GET',
        path:'/user/{name?}',
        handler:(req, res) => {
            const {name = "Tangguh"} = req.params

            const {from} = req.query

            if(from === "Indonesia") return `halo ${name} dari ${from}`

            return `Halo ${name}`
        }
    },
]

module.exports = routes