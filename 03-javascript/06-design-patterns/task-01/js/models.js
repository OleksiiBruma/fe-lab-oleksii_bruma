var faker = require("faker");

class Like {
    constructor(value) {
        this.value = value
    }

    likeUp() {
        this.value += 1;
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
    update(){
        this.likeAmount = this.like.getValue();
    }
}

 class List {
    constructor(amountBlocks) {
        let imageBlockList = [];
        for (let i = 0; i < amountBlocks; i++) {
            this.imageBlock = new ImageBlock(i);
            imageBlockList.push(this.imageBlock);
        }
        return imageBlockList;
    }
}
const model = new List (10);
model[1].like.likeUp();
model[1].update();
console.log(model);
module.exports.model=model;


