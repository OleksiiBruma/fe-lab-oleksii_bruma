var faker = require("faker");

class Like {
    constructor(value) {
        this.value = value
    }

    likeUp() {
        this.value += 1;
        return this.value;
    }

    getValue() {
        return this.value;
    }
}

 class ImageBlock {
    constructor(id) {
        this.like = new Like(faker.random.number());
        this.likeAmount = this.like.getValue();
        this.id = id;
        this.image = faker.image.avatar();
    }
}

 class List {
    constructor(amountBlocks) {
        let imageBlockList = [];
        for (let i = 0; i < amountBlocks; i++) {
            let imageBlock = new ImageBlock(i);
            imageBlockList.push(imageBlock);
        }
        return imageBlockList;
    }
}
const model = new List (10);
module.exports.model=model;


