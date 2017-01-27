const Node = require('./node');

class LinkedList 
{
    constructor() 
	{
		this._head = null;
		this._tail = null;
		this.length = 0;
	}

    append(data) 
	{
		if (this.isEmpty())
		{
		this._head = new Node(data);
		this._tail = this._head;
		} else {
			this._tail = this._tail.next = new Node(data,this._tail, null);
		}
		this.length++;
		
		return this;
	}

    head() { return this._head ? this._head.data : null}

    tail() { return this._tail ? this._tail.data : null}

    at(index) 
	{
		let element = this._head;
		for (let i=0; i<index; i++)
			element = element.next;
		return element.data;
	}
	
	
    insertAt(index, data) {
		let element = this._head;
		if(!index){
			this.tail = this.head = new Node(data);
			this.length++;
			return this;
		} 
			
		for (let i=0; i<index; i++)
			element = element.next;
		
		element = new Node(data,element.prev,element);
		element.prev.next = element;
		element.next.prev = element;
		
		
		this.length++;
		return this;
	}

    isEmpty() {
		if(!(this.length && this._head && this._tail)) return true;
		return false;
	}

    clear() {
		this._tail=null;
		this._head=null;
		this.length=0;
		
		return this;
		}

    deleteAt(index) {
		if(!index) {
			this._head.next = this._head;
			this._head.prev=null;
			this.length--;
			return this;	
		}
		let element = this._head;
		for (let i=0; i<index; i++)
			element = element.next;
		element.prev.next=element.next;
		element.next.prev=element.prev;
		this.length--;
		return this;
	}

    reverse() {
		let newList = new LinkedList;

		let element=this._tail;
		
		for(let i=0;i<this.length;i++)
		{
			newList.append(element.data);
			element=element.prev;
		}
		
		//this = newList; - immutable
		this._head = newList._head;
		this._tail = newList._tail;
		this.length = newList.length;
		// fine by me, although will the GC clear this context? i'm not sure
		return this;
	}

    indexOf(data) {
		let element = this._head;
		for (var i=0; i<this.length-1 && element.data!=data ; i++)
			element = element.next;
		return element.data===data ? i : -1;
	}
}

module.exports = LinkedList;
