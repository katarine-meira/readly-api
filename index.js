
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
})

app.get('/veiculos', async (req, res) => {
    try {
        const veiculos = await prisma.veiculo.findMany()
        res.json(veiculos)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
})

app.get('/veiculo/:id', async (req, res) => {
    const veiculoId = req.params.id;
    try {
        const veiculo = await prisma.veiculo.findUnique({
            where: { id: veiculoId }
        })
        res.json(veiculo)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
})

app.post('/cadastrar/veiculo', async (req, res) => {
    const { marca, modelo } = req.body
    try {
        const newVeiculo = await prisma.veiculo.create({
            data: {
                marca,
                modelo
            }
        })
        res.json({
            mensagem: "Cadastro de veículo realizado!",
            newVeiculo
        })
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar veículo." });
    }
})

app.post('/cadastrar/user', async (req, res) => {
    const { nome, sobrenome, idade } = req.body
    try {
        const newUser = await prisma.user.create({
            data: {
                nome,
                sobrenome,
                idade
            }
        })
        res.json({
            mensagem: "Cadastro de usuário realizado!",
            newUser
        })
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
})

app.put('/editar/:id', async (req, res) => {
    const { id } = req.params
    const { modelo, marca } = req.body
    try {
        const veiculo = await prisma.veiculo.update({
            where: { id: id },
            data: { modelo: modelo, marca: marca }
        })
        res.json(veiculo)
    } catch (error) {
        res.status(500).json({ error: "Erro ao editar usuário." });
    }
})

app.delete("/deletar/:id", async (req, res) => {
    const {id} = req.params
    try {
        const veiculoDeletado = await prisma.veiculo.delete({
            where: {id: id}
        })
        res.json(veiculoDeletado)
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar veículo." });
    }
})
