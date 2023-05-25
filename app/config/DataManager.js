export default class DataManager {
    static myInstance = null;
    userId = '';

    collections = [
        {
            userId: 0,
            id: 0,
            title: "test 2",
            image: require('../assets/AAA.png')
        },
        {
            userId: 0,
            id: 1,
            title: "test 3",
            image: require('../assets/AAB.png')
        },
        {
            userId: 1,
            id: 2,
            title: "test 4",
            image: require('../assets/AAB.png')
        }
    ]

    memories = [
        {
            id: 0,
            collectionId: 0,
            userId: 0,
            title: 'test 1',
            description: "test 1 description",
            image: require('../assets/ARU.png')
        },
        {
            id: 1,
            collectionId: 0,
            userId: 0,
            title: 'test 2',
            description: 'test 2 description',
            image: require('../assets/F6M.png')
        },
        {
            id: 2,
            collectionId: 0,
            userId: 0,
            title: 'test 3',
            description: 'test 3 description',
            image: require('../assets/XLB.png')
        },
        {
            id: 3,
            collectionId: 1,
            userId: 0,
            title: 'test 4',
            description: 'test 4 description',
            image: require('../assets/XLB.png')
        }
    ]
    users = [
        {
            username: "user1",
            email: 'user1@gmail.com',
            password: "pass1",
            userId: 0,
            firstName: 'John',
            lastName: 'Smith',
            profileImage: require("../assets/F6M.png")
        },
        {
            username: "user2",
            email: 'user2@gmail.com',
            password: "pass2",
            userId: 1,
            firstName: 'Mandy',
            lastName: 'Smith',
            profileImage: require("../assets/AAB.png")
        },
        {
            username: "user3",
            email: 'user3@gmail.com',
            password: "pass3",
            userId: 2,
            firstName: 'Tim',
            lastName: 'Cook',
            profileImage: require("../assets/ARU.png")
        }
    ];

    static getInstance() {
        if (DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getCollections(userId) {
        return this.collections.filter((collection) => collection.userId == userId)
    }
    getAllCollections() {
        return this.collections
    }
    getMemories(userId) {
        return this.memories.filter((memory) => memory.userId == userId)
    }
    getMemoriesForCollection(userId, collectionId) {
        return this.memories.filter((memory) => (memory.userId == userId, memory.collectionId == collectionId))
    }
    newMemory(memory) {
        this.memories.push(memory)
    }
    newCollection(collection) {
        this.collections.push(collection)
    }
    getUsers() {
        return this.users;
    }
    newUser(user) {
        this.users.push(user)
    }
    deleteMemory(memoryId) {
        this.memories = this.memories.filter((memory) => (memory.id !== memoryId))
    }
    deleteCollection(collectionId) {
        this.collections = this.collections.filter((collection) => (collection.id !== collectionId))
    }
    editCollection(edittedCollection) {
        this.collections[this.collections.findIndex((collection) => collection.id == edittedCollection.id)] = edittedCollection
    }
    editMemory(edittedMemory) {
        this.memories[this.memories.findIndex((memory) => memory.id === edittedMemory.id)] = edittedMemory
    }
    logout() {
        this.userId = ''
    }
}