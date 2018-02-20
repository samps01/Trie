class Node {
    constructor (value)	{
        this.data = value;
        this.children = {};
        this.isWord = false;
        this.prefixes = 0;
    }
}


class Trie {
    constructor (value)	{
        this.root = new Node('');
    }

    add(value) {
        if (!this.root) {
            return null;
        } else {
            this._addValue(this.root, value);
        }
    }

    _addValue(node, value) {
        node.prefixes++;
        let char = value[0];
        let child = node.children[char];
        if(!child) {
            child = new Node(char);
            node.children[char] = child;
        }
        let remainder = value.substring(1);
        if (remainder) {
            this._addValue(child, remainder);
        } else {
            child.isWord = true;
        }
    }

    isEmpty(obj) {
        if (Object.keys(obj).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    predict(value) {
        if (!this.root) {
            return null
        } else {
            return this._predict(this.root, value);
        }
    }
    getValue(node, value) {
        let arr = [];
        let str = value;
        let _getValue = function(newNode, value) {
            for (let key in newNode.children) {
                let child = newNode.children[key];
                str = value + key;
                if (child.isWord) {
                    arr.push(str);
                }
                _getValue(child, str);
            }
        }

        _getValue(node, value);

        return arr;
    }
    _predict(node, value) {
        //debugger;
        let count = 0;
        let char = value[count];
        let child = node.children[char];
        while (child) {
            count++;
            node = node.children[char];
            char = value[count];
            if (!char) {
                return this.getValue(node, value);
            }
            child = node.children[char];
        }
    }
}

let trie = new Trie();
trie.add('America');
trie.add('Australia');
trie.add('Austria');
console.log(trie.predict('A')); //[ 'America', 'Australia', 'Austria' ]