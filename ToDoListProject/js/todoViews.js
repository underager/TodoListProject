var TodoViews = Backbone.View.extend({
    id:'todoItemsContainer',
    
    initialize: function(options){
        if(!(options && options.model)){
            throw new Error('Need to pass Model to the TodosView ')
        }

        this.model.on('add', this.onAddTodoItem, this);
        this.model.on('remove',this.onRemoveTodoItem, this);
    },

    onRemoveTodoItem: function(removedTodoItem){
        console.log('remove todo item : '+removedTodoItem.toJSON().description);

        this.$('li#'+ removedTodoItem.id).remove();
    },

    onAddTodoItem: function(newTodoItem){
        var todoView = new TodoView({
            model : newTodoItem
        });

        
        this.$('#todoList').append(todoView.render().$el);
    },

    events:{
        // 'click #addButton': 'onAddClick',
        'keypress #newItemAddtxt' : 'onEnterKeyPress'
    },

    onEnterKeyPress:function(e){
        if(e.keyCode == 13){
            console.log('attempting to add new item');

            var $newItemtxt = $('#newItemAddtxt');

            if($newItemtxt.val())
            {
                var newTodoItem = new TodoItem({
                    title : $newItemtxt.val()
                });

                this.model.create(newTodoItem);
            }

            $newItemtxt.val(''); 
        }
            // this.onAddClick();
    },

    // onAddClick: function(){
    //     console.log('attempting to add new item');

    //     var $newItemtxt = $('#newItemAddtxt');

    //     if($newItemtxt.val())
    //     {
    //         var newTodoItem = new TodoItem({
    //             title : $newItemtxt.val()
    //         });

    //         this.model.create(newTodoItem);
    //     }

    //     $newItemtxt.val('');        
    // },
    
    render: function(){
        
        //using template code
        var template = $('#todoItemsTemplate').html();
        var html = Mustache.render(template);
        this.$el.html(html);


        //following 4 lines are without template.
        // var self = this;
        // this.$el.append("<input type='text' id='newItemAddtxt' placeholder='add new item'></input>");
        // this.$el.append('<button id="addButton">Add</button>');
        // this.$el.append('<ul id="todoList"></ul>');

        //we don't need the following section code as we are iterating when we are adding the items in the 'onAddTodoItem' function
        // this.model.each(function(todo){
        //     var view = new TodoView({ model : todo });
        //     self.$el.append(view.render().$el);
        // })

        return this;
    }
})