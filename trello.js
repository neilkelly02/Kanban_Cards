// Author: Neil Kelly

const app = new Vue({
    data(){
        return {
            //main data displayed on page, overwritten in search()
            boardData : sampleMinBoard,
            //stores boardData while search results are being displayed
            boardDataStorage : null,
            colorSettings : {
                options : [
                    {"colorName" : "White"},
                    {"colorName" : "Red"},
                    {"colorName" : "Orange"},
                    {"colorName" : "Yellow"},
                    {"colorName" : "Green"},
                    {"colorName" : "Blue"},
                    {"colorName" : "Purple"},
                ],
                background : "",
                header : "white",
                column : "white",
                card : "white"
            },
            globalEdit : {
                // tracks current card being dragged
                dragState : null,
                //modal for adding new cards
                modalVisible : false,
                //modal for adding new column
                columnModalVisible : false,
                //config sidebar for searching, color etc
                sidebarVisible : false,
                //search results currently being displayed?
                searchResVisible : false,
                // temp string storage for input in comments, descriptions, ideas, etc
                inputText : "",
                //text user puts into the search box
                searchText : "",
                // temp field storage for card about to be created
                inputCardColumn : null, //stores EXISTING column about to recieve new card
                inputCard : [
                    {"fieldName" : "Name", "fieldText" : ""},
                    {"fieldName" : "Description", "fieldText" : ""},
                    {"fieldName" : "Ideas", "fieldText" : ""},
                    {"fieldName" : "Tags (seperate tag names with space)", "fieldText" : ""}
                ],
                // temp field storage for NON EXISTING column about to be created
                inputColumn : [
                    {"fieldName" : "Name", "fieldText" : ""},
                    // {"fieldName" : "Color", "fieldText" : ""}
                ]
            }
        };
    },
    methods:{
    // color methods
        setBackgroundColor(colorIdx){
            let color = this.colorSettings.options[colorIdx].colorName;
            this.colorSettings.background = color.toLowerCase();
        },
        setHeaderColor(colorIdx){
            let color = this.colorSettings.options[colorIdx].colorName;
            this.colorSettings.header = color.toLowerCase();
        },
        setColumnColor(colorIdx){
            let color = this.colorSettings.options[colorIdx].colorName;
            this.colorSettings.column = color.toLowerCase();
        },
        setCardColor(colorIdx){
            let color = this.colorSettings.options[colorIdx].colorName;
            this.colorSettings.card = color.toLowerCase();
        },
    // column methods
        duplicateColumn(currColumn){
            //deep copy so new comments don't appear on multiple columns
            this.boardData.columns.splice(this.getColumnIndex(currColumn), 0, JSON.parse(JSON.stringify(currColumn)));
        },
        removeColumn(currColumn){
            this.boardData.columns.splice(this.getColumnIndex(currColumn), 1);
        },
        addColumn(currColumn){
            this.boardData.columns.push(currColumn);
        },
        createColumn(){
            let newColumnObj = {
                "meta":{
                    "columnName" : {"text" : this.globalEdit.inputColumn[0].fieldText, "isEditing" : false},
                    "background" : {
                        "isImage" : false,
                        "backgroundImage" : null
                    },
                    "allTags" : []
                },
                "cards": []
            }

            this.addColumn(newColumnObj);
            this.resetColumnInput();
        },
        resetColumnInput(){
            this.globalEdit.inputColumn.forEach(field => {
                field.fieldText = "";
            });
        },
        getColumnIndex(currColumn){
            return this.boardData.columns.indexOf(currColumn);
        },

    //Card methods
        duplicateCard(currColumn, currCard){
            currColumn.cards.splice(this.getCardIndex(currColumn, currCard), 0, JSON.parse(JSON.stringify(currCard)));
        },
        removeCard(currColumn, currCard){
            console.log("bruh");
            console.log("deleting card name: " + currCard.cardName.text);
            currColumn.cards.splice(this.getCardIndex(currColumn, currCard), 1);
        },
        addCard(currColumn, currCard){
            if(currColumn && currCard){
                currColumn.cards.push(currCard);
            }
        },
        createCard(){
            let newCardObj = {
                "cardName" : {"text" : this.globalEdit.inputCard[0].fieldText, "isEditing" : false},
                "cardDescription" : {"text" : this.globalEdit.inputCard[1].fieldText, "isEditing" : false},
                "cardIdeas" : {"text" : this.globalEdit.inputCard[2].fieldText, "isEditing" : false},
                "comments" : [],
                "cardTags" : this.globalEdit.inputCard[3].fieldText.split(" ").map(tagText =>{
                    return {"tagName" : tagText}
                })
            }
            this.addCard(this.globalEdit.inputCardColumn, newCardObj);
            this.resetCardInput();
        },
        resetCardInput(){
            this.globalEdit.inputCard.forEach(field => {
                field.fieldText = "";
            });
            this.globalEdit.inputCardColumn = null;
        },
        addComment(currCard){
            let newCommentObj = {
                "commentBody" : currCard.inputText
            }
            currCard.inputText = "";
            currCard.comments.push(newCommentObj);
        },
        getCardIndex(currColumn, currCard){
            return currColumn.cards.indexOf(currCard);
        },

    // Search methods
        search(){
            //construct empty board data structure
            //iterate through entire existing boardData data structre
            //populate new data structure using only fields that contain searchText
                //if a column title contains searchText, display the whole column with all cards
                //else only display cards in that column that contain searchText
                //if column title+cards all don't contain searchText, do not display it
            //display new data structure

            let searchRes = this.constructSearchOutput();
            let searchTarget = this.globalEdit.searchText;

            this.boardData.columns.forEach(col => {    
                if(this.columnTitleContains(col, searchTarget)){
                    searchRes.columns.push(col);
                }
                else{ //show column, but only with cards that contain searchText
                    let newPartialColumn = JSON.parse(JSON.stringify(col));
                    newPartialColumn.cards = [];
                    col.cards.forEach(card => {
                        if(this.cardContains(card, searchTarget)){
                            newPartialColumn.cards.push(card);
                        }
                    });
                    if(newPartialColumn.cards.length > 0){
                        searchRes.columns.push(newPartialColumn);
                    }
                }
            });

            this.boardDataStorage = this.boardData;
            this.boardData = searchRes;
            this.globalEdit.searchResVisible = true;

            this.globalEdit.searchText = "";
        },
        clearSearch(){
            this.boardData = this.boardDataStorage;
            this.boardDataStorage = null;
            this.globalEdit.searchResVisible = false;
        },
        constructSearchOutput(){
            return {
                "meta" : {
                    "boardName" : {"text" : this.boardData.meta.boardName.text, "isEditing" : this.boardData.meta.boardName.isEditing},
                    "boardDeadline" : {"text" : this.boardData.meta.boardDeadline.text, "isEditing" : this.boardData.meta.boardDeadline.isEditing},
                    "boardDescription" : this.boardData.meta.boardDescription,
                    "boardIsComplete" : false
                },
                "columns" : []
            }
        },
        columnTitleContains(currColumn, target){
            if(currColumn.meta.columnName.text.includes(target)){
                return true;
            }
            return false;
        },
        cardContains(currCard, target){
            return (
                currCard.cardName.text.includes(target) ||
                currCard.cardDescription.text.includes(target) ||
                currCard.cardIdeas.text.includes(target) ||
                this.commentsContain(currCard.comments, target) ||
                this.tagsContain(currCard.cardTags)
            );
        },
        commentsContain(currComments, target){
            let res = false;
            currComments.forEach(comment => {
                if(comment.commentBody.includes(target)){
                    res = true;
                };
            });
            return res;
        },
        tagsContain(currTags, target){
            let res = false;
            currTags.forEach(tag => {
                if(tag.tagName.includes(target)){
                    res = true;
                }
            });
            return res;
        },
    // Drag and drop
        onDrop(currColumn){
            this.removeCard(this.globalEdit.dragState.column, this.globalEdit.dragState.card);
            this.addCard(currColumn, this.globalEdit.dragState.card);
            this.globalEdit.dragState = null;
        },
        startDrag(currColumn, currCard){
            this.globalEdit.dragState = {"column" : currColumn, "card" : currCard};
        }
    }
});

app.$mount("#app");