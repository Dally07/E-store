const request = require('supertest'); // Pour faire des requêtes HTTP
const app = require('../app'); // Remplace par le chemin de ton fichier principal d'application
const { Commande, Client } = require('../models'); // Importer tes modèles

// Simuler le modèle Client
jest.mock('../models', () => {
    return {
        ...jest.requireActual('../models'), // Garder les autres modèles inchangés
        Client: {
            findOne: jest.fn(),
            create: jest.fn(),
        },
        Commande: {
            create: jest.fn(),
        },
    };
});

describe('POST /api/commandes/create', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    });

    it('devrait créer une commande avec un client valide', async () => {
        // Simuler un client trouvé
        const mockClient = { id: 1, nom: 'Client Test', email: 'client@test.com' };
        Client.findOne.mockResolvedValue(mockClient); // Simuler le retour d'un client

        const response = await request(app)
            .post('http://localhost:3001/api/commandes/create')
            .send({
                client_id: mockClient.id,
                produits: [
                    { id: 1, quantite: 2 },
                    
                ],
                total: 30000
            });

        expect(response.status).toBe(201); // Vérifier que la réponse a un statut 201
        expect(response.body).toHaveProperty('message', 'Commande créée avec succès');
        expect(response.body).toHaveProperty('commande');
        expect(Commande.create).toHaveBeenCalled(); // Vérifier que la méthode create a été appelée
    });

    it('devrait retourner une erreur si le client n\'existe pas', async () => {
        // Simuler qu'aucun client n'est trouvé
        Client.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post('http://localhost:3001/api/commandes/create')
            .send({
                client_id: 999, // ID de client inexistant
                produits: [
                    { id: 1, quantite: 2 }
                ],
                total: 20000
            });

        expect(response.status).toBe(404); // Vérifier que la réponse a un statut 404
        expect(response.body).toHaveProperty('message', 'Client non trouvé');
    });
});
