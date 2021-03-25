// Author: Neil Kelly
// NetID: nk220

//this is a sample board
let sampleMinBoard = {
    "meta" : {
        "boardName" : {"text" : "Sample Project", "isEditing" : false},
        "boardDeadline" : {"text" : "June 18, 2045", "isEditing" : false},
        "boardDescription" : {"text" : "I'm not really sure what this project is about, but I hope it goes well!", "isEditing" : false},
        "boardIsComplete" : false
    },
    "columns" : [
        {
            "meta":{
                "columnName" : {"text" : "Sample Column", "isEditing" : false},
                "background" : {
                    "isImage" : false,
                    "backgroundImage" : null
                },
                "allTags" : [
                    {"tagName" : "tag1"},
                    {"tagName" : "tag2"}
                ]
            },
            "cards": [
                {
                    "cardName" : {"text" : "Sample Card", "isEditing" : false},
                    "cardDescription" : {"text" : "Here is a sample description, it is describing this card.", "isEditing" : false},
                    "cardIdeas" : {"text" : "Sample idea, I can't come up with any good ones right now.", "isEditing" : false},
                    "comments" : [
                        {"commentBody" : "Sample comment"}
                    ],
        
                    "cardTags" : [
                        {"tagName" : "tag1"},
                        {"tagName" : "tag2"}
                    ]
                }
            ]
        },
        {
            "meta":{
                "columnName" : {"text" : "School Work", "isEditing" : false},
                "background" : {
                    "isImage" : false,
                    "backgroundImage" : null
                },
                "allTags" : [
                    {"tagName" : "tag1"},
                    {"tagName" : "tag2"}
                ]
            },
            "cards": [
                {
                    "cardName" : {"text" : "Complete stats problem set", "isEditing" : false},
                    "cardDescription" : {"text" : "Finish this week's homework assignment posted on Sakai", "isEditing" : false},
                    "cardIdeas" : {"text" : "I think the professor said there would be a hint for problem 6 in the lecture", "isEditing" : false},
                    "comments" : [
                        {"commentBody" : "Problem 5 is really easy"},
                        {"commentBody" : "The deadline got pushed back by a day"}

                    ],
        
                    "cardTags" : [
                        {"tagName" : "math"},
                        {"tagName" : "duke"},
                        {"tagName" : "homework"}
                    ]
                },
                {
                    "cardName" : {"text" : "Attend office hours", "isEditing" : false},
                    "cardDescription" : {"text" : "Attend virtual hours to get help with homework", "isEditing" : false},
                    "cardIdeas" : {"text" : "Try writing out a list of questions for the professor to save time", "isEditing" : false},
                    "comments" : [
                        {"commentBody" : "Office hours will be held at 3pm on the professor's zoom room"}
                    ],
        
                    "cardTags" : [
                        {"tagName" : "homework"},
                        {"tagName" : "duke"}
                    ]
                }
            ]
        }
    ]
}

