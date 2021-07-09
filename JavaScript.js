//DECLARE ANY GLOBAL VARIABLES HERE


let GoogleAuth;
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/script.scriptapp https://www.googleapis.com/auth/script.deployments https://www.googleapis.com/auth/script.external_request https://www.googleapis.com/auth/presentations';
const spreadsheetId = "1HdgnSTtfFPBr5obA2hyuhLOqdaA2bmqIShW9IKVWNn0"; //prosepect manager
//const spreadsheetId = "1qIcmrgiVhKtz1kWPJ0ZkpBt7uyP6o_g-cc-7t0oYdk0"; //learn doPost
const appURL = "https://script.google.com/macros/s/AKfycbyUdaa1X2K0YxHt42xfN8es1EtJMqAJhX-JJ1-H4c4_I2Le8QqZGVlmpUS7TMtIL7H8/exec";

    //All dropdown variables
    var dojoLocations = [
        "",
        "Ankeny",
        "Johnston",
        "Waukee",
        "WDM"
      ];
    
    var dojoAddresses = [
        "1810 SW White Birch Cir Suite 100, Ankeny, IA 50023",
        "8805 Chambery Blvd, Johnston, IA 50131",
        "1960 Grand Ave #17, West Des Moines, IA 50265",
        "120 SE Laurel St, Waukee, IA 50263"
    ]
  
      var studentStatuses = [
        "",
        "Prospect",
        "Student",
        "Alumni"
      ];
  
      var ageClasses = [
        "",
        "Ages 4-7",
        "Ages 8-12",
        "Ages 13-20",
        "Ages 21-99"
      ];
      
      var intro1Times = [
        "",
        "2:00",
        "2:15",
        "2:30",
        "2:45",
        "3:00",
        "3:15",
        "3:30",
        "3:45",
        "4:00",
        "4:15",
        "4:30",
        "4:45",
        "5:00",
        "5:15",
        "5:30",
        "5:45",
        "6:00",
        "6:15",
        "6:30",
        "6:45",
        "7:00",
        "7:15",
        "7:30",
        "7:45",
        "8:00",
        "8:15",
        "8:30",
        "8:45",
        "9:00"
      ];
      var intro2Times = [
        "",
        "2:00",
        "2:15",
        "2:30",
        "2:45",
        "3:00",
        "3:15",
        "3:30",
        "3:45",
        "4:00",
        "4:15",
        "4:30",
        "4:45",
        "5:00",
        "5:15",
        "5:30",
        "5:45",
        "6:00",
        "6:15",
        "6:30",
        "6:45",
        "7:00",
        "7:15",
        "7:30",
        "7:45",
        "8:00",
        "8:15",
        "8:30",
        "8:45",
        "9:00"
      ];
      
      var prospectPhases = [
        "",
        "00-Pre-Paid/Not Yet Contacted",
        "01-New Lead/Not Yet Contacted",
        "10-Intro 1 Scheduled",
        "11-Intro 1 No Show-Needs Contacts",
        "12-Intro 1 Phone Tag",
        "20-Intro 2 Scheduled",
        "21-Intro 2 No Show-Needs Contacts",
        "22-Intro 2 Phone Tag",
        "70-Intro Completed -Enrolled",
        "30-Intro Completed -Waiting For Reply",
        "60-Intro Completed -Did Not Enrolled",
        "40-Never Attended Intro 1 -Lost Intros",
        "50-Never Attended Intro 2 -Lost Intros",
        "80-Formerly Enrolled"  
      ];
  
      var leadSources = [
        "",
        "Online",
        "Phone",
        "Walk-In",
        "Event"
      ];
      
      var leadSourceSubcategories = [
        "",
        "Websearch",
        "Facebook",
        "Print Ad",
        "Online Ad",
        "Internal Event",
        "External Event",
        "Signage"
      ];
  
      var introOffers = [
        "",
        "1 Free Class Uniform Not Included",
        "1 Week $19.95 Includes Uniform",
        "6 Weeks $149 Includes Uniform"
      ];
  
      var introNotes = [
        "",
        "No Charge for class.",
        "Paid online.",
        "Paid at Call Center.",
        "Planning to pay at time of intro."
      ];

$(document).ready(function() {
    console.log("loading client libraries and checking sign in status...")
    //async defer src="https://apis.google.com/js/api.js"
    handleClientLoad();

  });



function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
    console.log("Client load complete...")
}

function initClient() {
    // In practice, your app can retrieve one or more discovery documents.
    //var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    var discoveryDocs = [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        "https://script.googleapis.com/$discovery/rest?version=v1"
        ]
    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'AIzaSyArmBSmCY-VxB3XIlgFuS5SdwG9p-skggs',
        'clientId': '230900590151-d6jdsn67t1n58v2hbof63pm0jg682lni.apps.googleusercontent.com',
        'discoveryDocs': discoveryDocs,
        'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = GoogleAuth.currentUser.get();
      setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function() {
        handleAuthClick();
      });
      $('#revoke-access-button').click(function() {
        revokeAccess();
      });
      $('#update-row-button').click(function() {
        console.log("yo!! updateRow was clicked!");
        updateRow();
     });
     $('#find-record-id').click(function() {
        console.log("read all data button clicked!");
        findRecordId();
     });
     $('#add-record-button').click(function() {
        console.log("add record button clicked!");
        appendRow();
     });    
     $('#read-all-data').click(function() {
        console.log("readData!");
        readGS();
     });
     $('#calendar-button').click(function() {
        console.log("Add to Calendar!");
        testCalendar();
        //addToCalendar();
     });
     $('#script-button').click(function() {
        console.log("Run Google script!");
        appScriptTest();
        //addToCalendar();
     });            
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked "Sign out" button.
      GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      console.log ("I am signed in as: "+ user.getBasicProfile().getName());
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('You are currently signed in and have granted ' +
          'access to this app.');
          newLeadsInit();
    ////////////////////Put dataTables init function here.
        console.log("Login initialization complete...");
    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.');
    }
}


function updateSigninStatus() {
    setSigninStatus();
}

 function handleFormSubmit(formObject) {
    console.log(formObject.dojo_location.value);
    //google.script.run.withSuccessHandler(ajaxReload).processForm(formObject);
    addNewRecord(formObject);
    //$('#myModal').modal('hide');
    //$('#unCloseable').modal({backdrop: 'static', keyboard: false});
    ajaxReload();
    //$('#unCloseable').modal('hide');

    //console.log("hiding uncloseable modal...")
  }


function checkCalendarEvents(d) {

    introStage = "";
    dojoAddress = "";
    if (d.gsx$intro1date.$t !=="" && d.gsx$intro2date.$t === ""){
        console.log("Intro 1");
        introStage = "Intro 1";
    }else if(d.gsx$intro1date.$t !=="" && d.gsx$intro2date.$t !== "" && d.gsx$intro2Date.$t !== "NaN:NaN"){
        console.log("Intro 2");
        introStage = "Intro 2";
    }
    console.log("The current introstage is: "+introStage)
    if (d.gsx$dojolocation.$t === "Ankeny"){
        dojoAddress = dojoAddresses[0];
    }else if (d.gsx$dojolocation.$t === "Johnston"){
        dojoAddress = dojoAddresses[1];
    }else if(d.gsx$dojolocation.$t === "WDM"){
        dojoAddress = dojoAddresses[2];
    }else if (d.gsx$dojolocation.$t === "Waukee"){
        dojoAddress = dojoAddresses[3];
    }



    return gapi.client.calendar.events.list({
        "calendarId": "info-"+d.gsx$dojolocation.$t+"@mydojos.com",
        "maxResults": 10000,
        "q": "intro",
        "showDeleted": false
    })
        .then(function(response) {
            resultItems = response.result.items;
            valueArray = [];
            calendarId = "info-"+d.gsx$dojolocation.$t+"@mydojos.com";



            for (let index = 0; index < resultItems.length; index++) {
                console.log(resultItems[index].summary);
                valueArray.push(resultItems[index].summary);
                console.log("Value array length: "+valueArray.length);
            }
            console.log("Value array: " +valueArray);
            var eventTitle = introStage+" - " +d.gsx$participantfirstname.$t+" "+d.gsx$participantlastname.$t;
            var description = "First Name: "+d.gsx$participantfirstname.$t+"\r\n Last Name: "+d.gsx$participantlastname.$t+"\r\n Age: "+(getAge(d.gsx$dateofbirth.$t))+"\r\n Age Class: "+d.gsx$ageclass.$t+"\r\n Phone: "+d.gsx$phone.$t+"\r\n Email: "+d.gsx$email.$t+" \r\nIntro Notes: "+d.gsx$intronotes.$t;
            var sT = "";
            if (introStage === "Intro 1"){
                sT = new Date(new Date(d.gsx$intro1date.$t+" " +d.gsx$intro1time.$t));
                sT2 = sT.toLocaleString()
            }else if(introStage === "Intro 2"){
                sT = new Date(new Date(d.gsx$intro2date.$t+" " +d.gsx$intro2Time.$t));//add_minutes(d.gsx$intro2time.$t,12*60));
            }
            var sYear = sT.getFullYear();
            var sMonth = sT.getMonth()+1;
            var sDay = sT.getDate();
            var hours = sT.getHours();
            var hr = hours < 10 ? '0' + hours : hours;

            var minutes = sT.getMinutes();
            var min = (minutes < 10) ? '0' + minutes : minutes;

            var seconds = sT.getSeconds();
            var sec = (seconds < 10) ? '0' + seconds : seconds;

            var newDateString = sYear + '-' + sMonth  + '-' + sDay;
            var newTimeString = hr + ':' + min + ':' + sec;

            var sDateTimeString = newDateString + 'T' + newTimeString;
            console.log("DateTime string: "+sDateTimeString);

            //console.log("Start Time: "+(new Date(sT).getFullYear())+"-"+(new Date(sT).)+"-"+(new Date(sT).getDay()));
            var add_minutes =  function (dt, minutes) {
                return new Date(dt.getTime() + minutes*60000);
            }
            var eT = add_minutes(sT, 30);
            var eHours = eT.getHours();
            var eHr = eHours < 10 ? '0' + eHours : eHours;
            var eSeconds = eT.getSeconds();
            var eSec = (eSeconds < 10) ? '0' + eSeconds : eSeconds;

            var eMinutes = eT.getMinutes();
            var eMin = (eMinutes < 10) ? '0' + eMinutes : eMinutes;
            eTimeString = eHr+':'+eMin+':'+eSec;
            var eDateTimeString = newDateString +'T'+eTimeString;

            console.log(newDateString+"T"+newTimeString);
            console.log(newDateString+"T"+eTimeString);
            console.log("End Time: "+eT);
            console.log("adjusted eT: " +eT.toLocaleString());
            console.log("Dojo Address: "+dojoAddress);
            console.log("description" +description);
            console.log("Calendar ID: "+calendarId);
            console.log("event title: "+eventTitle);
                // Handle the results here (response.result has the parsed body).
                    if (valueArray.includes(eventTitle)){
                        alert("The calendar entry already exists!");
                    }else{
                        console.log("Add this event to the calendar!");
                        var event = {
                            'summary': eventTitle,
                            'location': dojoAddress,
                            'description': description,
                            'start': {
                            'dateTime': sDateTimeString,
                              'timeZone': 'America/Chicago'
                            },
                            'end': {
                              'dateTime': eDateTimeString,
                              'timeZone': 'America/Chicago'
                            },
                            'recurrence': [
                              'RRULE:FREQ=DAILY;COUNT=1'
                            ],
                            'attendees': [
                              {'email': d.gsx$email.$t},
                            ],
                            'reminders': {
                              'useDefault': false,
                              'overrides': [
                                {'method': 'email', 'minutes': 24 * 60},
                                {'method': 'popup', 'minutes': 60 * 2}
                              ]
                            }
                          };
                          
                          var request = gapi.client.calendar.events.insert({
                            'calendarId': calendarId,
                            'resource': event
                          });
                          
                          request.execute(function(event) {
                            //appendPre('Event created: ' + event.htmlLink);
                            console.log("request complete!");
                            alert("Successfully added intro to calendar!!");
                          });



                        console.log("Success!!");
                    //}else{
                      //  alert("A calendar event with this title already exists!");
                        //}
                    }
        },
                function(err) { 
                    alert("An error occured. See the debugger console for details.")
                    console.error("Execute error", err); });
}

function appScriptTest(d){
    //USE DEPLOYMENT ID INSTEAD OF SCRIPT ID
    var scriptId = "AKfycby9gt1h0sdZjo658JimEi2CF3IQZRdZpYzJOwgXeoqsL7Euvx-7iIvCliH9PsQwSYpn";
    var formInfo = {
        //record_id : new Date().getTime(),
        add_constantcontact: "",
        age_class: d.gsx$ageclass.$t,
        city: d.gsx$city.$t,
        communication_notes: d.gsx$communicationnotes.$t,
        date_ofbirth:"",
        dojo_location: d.gsx$dojolocation.$t,
        dojo_notes: d.gsx$dojonotes.$t,
        email: d.gsx$email.$t,
        gender: d.gsx$gender.$t,
        inquire_date: d.gsx$inquiredate.$t,
        interest: "",
        intro1_attended: "",
        intro1_date: d.gsx$intro1date.$t,
        intro1_endtime: "",
        intro1_starttime: "",
        intro1_time: d.gsx$intro1time.$t,//(d.intro1_time.value).getTime(),
        intro2_attended:"",
        intro2_date:"",
        intro2_endtime:"",
        intro2_starttime:"",
        intro2_time:"",
        intro_notes: d.gsx$intronotes.$t,
        intro_offer: d.gsx$introoffer.$t,
        lastcontact_date: d.gsx$lastcontactdate.$t,
        lead_date: d.gsx$leaddate.$t,
        lead_firstname: d.gsx$leadfirstname,
        lead_lastname: d.gsx$leadlastname,
        leadsource: d.gsx$leadsource,
        leadsource_subcategory: d.gsx$leadsourcesubcategory.$t,
        participant_firstname: d.gsx$participantfirstname.$t,
        participant_lastname: d.gsx$participantlastname.$t,
        phone: d.gsx$phone.$t,
        prospect_phase: d.gsx$prospectphase.$t,
        send_introsheet: "",
        state: d.gsx$state.$t,
        street_address: d.gsx$streetaddress.$t,
        student_status: "",
        zip: d.gsx$zip.$t
    }
    // Call the Apps Script API run method
    //   'scriptId' is the URL parameter that states what script to run
    //   'resource' describes the run request body (with the function name
    //              to execute)
    gapi.client.script.scripts.run({
      'scriptId': scriptId,
      'resource': {
        'function': 'sendWelcomeForm',
        "parameters": [
            formInfo            
          ],
      }
    }).then(function(resp) {
      var result = resp.result;
      if (result.error && result.error.status) {
          console.log("Error calling API!");
        // The API encountered a problem before the script
        // started executing.
        //appendPre('Error calling API:');
        //appendPre(JSON.stringify(result, null, 2));
      } else if (result.error) {
        // The API executed, but the script returned an error.
  
        // Extract the first (and only) set of error details.
        // The values of this object are the script's 'errorMessage' and
        // 'errorType', and an array of stack trace elements.
        var error = result.error.details[0];
        //appendPre('Script error message: ' + error.errorMessage);
        console.log('Script error message: ' + error.errorMessage);
  
        if (error.scriptStackTraceElements) {
            console.log("Stack Trace Elements present!");
          // There may not be a stacktrace if the script didn't start
          // executing.
          //appendPre('Script error stacktrace:');
          /*for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
            var trace = error.scriptStackTraceElements[i];
            //appendPre('\t' + trace.function + ':' + trace.lineNumber);
            console.log('\t' + trace.function + ':' + trace.lineNumber);
          }*/
        }
      } else {
        // The structure of the result will depend upon what the Apps
        // Script function returns. Here, the function returns an Apps
        // Script Object with String keys and values, and so the result
        // is treated as a JavaScript object (folderSet).
  
        console.log(resp.result);
      }
    });
  }
  

function testCalendar(){
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2021-07-05T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': 'ç',
          'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
          {'email': 'lpage@example.com'},
          {'email': 'sbrin@example.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };
      
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'info-wdm@mydojos.com',
        'resource': event
      });
      
      request.execute(function(event) {
        //appendPre('Event created: ' + event.htmlLink);
      });
}

function addToCalendar(d){
    var event = {
        'summary': 'This is a test entry',
        'location': 'Test',
        'description': 'This is a test description',
        'start': {
          'dateTime': '2021-07-05T09:00:00-07:00',
          'timeZone': 'America/Chicago'
        },
        'end': {
          'dateTime': '2021-07-05T17:00:00-07:00',
          'timeZone': 'America/Chicago'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'attendees': [
          {'email': 'spckoski@gmail.com'},
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 60 * 2}
          ]
        }
      };
      
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'info-wdm@mydojos.com',
        'resource': event
      });
      
      request.execute(function(event) {
        //appendPre('Event created: ' + event.htmlLink);
      });
}


function readGS(){
    console.log("Reading all data...");
    const searchValue = 50;
    return gapi.client.sheets.spreadsheets.values.get({
        "range": "GAS",
        "spreadsheetId": spreadsheetId,
        //"prettyPrint": true
    })
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            //console.log(response.result.values[0][0]);
            var valueArray = response.result.values;
            //var valueArrayLength = response.result.values.length();
            //console.log(response);
            valueArray.shift();
            console.log(valueArray);
            console.log(valueArray.length);
            //console.log(valueArray[0].indexOf('123456'));
            valueArray.find(function (){
                for (let index = 0; index < valueArray.length; index++) {
                    const element = valueArray[index];
                    console.log("the element index number is: "+index+", the value of the currently inspected element is: "+valueArray[index][0]+", the search value is: "+searchValue);
                    if(searchValue == valueArray[index][0]){
                        console.log("element located");
                        //It's index +2 because I have removed the headers from the array to return only the values in the array
                        console.log("the row index of the searched value is: "+(index+2));
                        var test = (index+2);
                        console.log(test);
                        return gapi.client.sheets.spreadsheets.batchUpdate({
                            "spreadsheetId": spreadsheetId,
                            "resource": {
                              "requests": [
                                {
                                  "deleteDimension": {
                                    "range": {
                                      "sheetId": 0,
                                      "dimension": "ROWS",
                                      //"startIndex": 5,
                                      "startIndex": test-1,
                                      //"endIndex": 
                                      "endIndex":test
                                    }
                                  }
                                }
                              ]
                            }
                          })
                              .then(function(response) {
                                      // Handle the results here (response.result has the parsed body).
                                      console.log("Response", response);
                                    },
                                    function(err) { console.error("Execute error", err); });
                    }else{
                        console.log("Checking next record...")
                    }
                }
            });
        },
        function(err) { console.error("Execute error", err); });
}

function deleteRow(rowData) {
    console.log("Reading all data...");
    console.log("Row data: "+rowData.gsx$recordid.$t);
    const searchValue = rowData.gsx$recordid.$t;
    return gapi.client.sheets.spreadsheets.values.get({
        "range": "CC_AllData",
        "spreadsheetId": spreadsheetId,
        //"prettyPrint": true
    })
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            //console.log(response.result.values[0][0]);
            var valueArray = response.result.values;
            //var valueArrayLength = response.result.values.length();
            //console.log(response);
            valueArray.shift();
            console.log(valueArray);
            console.log(valueArray.length);
            //console.log(valueArray[0].indexOf('123456'));
            valueArray.find(function (){
                for (let index = 0; index < valueArray.length; index++) {
                    const element = valueArray[index];
                    console.log("the element index number is: "+index+", the value of the currently inspected element is: "+valueArray[index][0]+", the search value is: "+searchValue);
                    if(searchValue == valueArray[index][0]){
                        console.log("element located");
                        //It's index +2 because I have removed the headers from the array to return only the values in the array
                        console.log("the row index of the searched value is: "+(index+2));
                        var test = (index+2);
                        console.log(test);
                        return gapi.client.sheets.spreadsheets.batchUpdate({
                            "spreadsheetId": spreadsheetId,
                            "resource": {
                              "requests": [
                                {
                                  "deleteDimension": {
                                    "range": {
                                      "sheetId": 81311297,
                                      "dimension": "ROWS",
                                      //"startIndex": 5,
                                      "startIndex": test-1,
                                      //"endIndex": 
                                      "endIndex":test
                                    }
                                  }
                                }
                              ]
                            }
                          })
                              .then(function(response) {
                                      // Handle the results here (response.result has the parsed body).
                                      console.log("Response", response);                                      
                                    },
                                    function(err) { console.error("Execute error", err); })
                                .then(
                                    function(){
                                        ajaxReload();
                                    });
                    }else{
                        console.log("Checking next record...")
                    }
                }
            });
        },
        function(err) { console.error("Execute error", err); });
}


function updateRow(formData, searchValue) {
    console.log("Reading all data for update...");
    //const searchValue = searchValue;
    return gapi.client.sheets.spreadsheets.values.get({
        "range": "CC_AllData",
        "spreadsheetId": spreadsheetId,
        //"prettyPrint": true
    })
        .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            //console.log(response.result.values[0][0]);
            var valueArray = response.result.values;
            //var valueArrayLength = response.result.values.length();
            //console.log(response);
            //valueArray.shift();
            console.log(valueArray);
            console.log(valueArray.length);
            //console.log(valueArray[0].indexOf('123456'));
            valueArray.find(function (){
                for (let index = 0; index < valueArray.length; index++) {
                    const element = valueArray[index];
                    console.log("the element index number is: "+index+", the value of the currently inspected element is: "+valueArray[index][0]+", the search value is: "+searchValue);
                    if(searchValue == valueArray[index][0]){
                        console.log("element located");
                        console.log("the row index of the searched value is: "+(index+2));
                        var test = (index+1);
                        var updateRange = "CC_AllData!A"+test+":"+test;
                        console.log("Update range is: " +updateRange);

                        console.log(test);
                        return gapi.client.sheets.spreadsheets.values.batchUpdate({
                            "spreadsheetId": spreadsheetId,
                            "valueInputOption": "RAW",
                            "data": [{
                                "majorDimension" : "ROWS",
                                "range": updateRange,
                                "values":[
                                    [
                                        searchValue,
                                        formData.lead_date.value,
                                        formData.inquire_date.value,
                                        formData.dojo_location.value,
                                        formData.student_status.value,
                                        formData.lead_firstname.value,
                                        formData.lead_lastname.value,
                                        formData.phone.value,
                                        formData.email.value,
                                        formData.lastcontact_date.value,
                                        formData.participant_firstname.value,
                                        formData.participant_lastname.value,
                                        formData.age_class.value,
                                        formData.intro1_date.value,
                                        new Date("2021-1-1 "+ formData.intro1_time.value).toLocaleTimeString(),
                                        "",
                                        "",
                                        formData.intro1_attended.value,
                                        formData.intro2_date.value,
                                        new Date("2021-1-1 "+ formData.intro2_time.value).toLocaleTimeString(),
                                        "",
                                        "",
                                        formData.intro2_attended.value,
                                        formData.prospect_phase.value,
                                        formData.lead_source.value,
                                        formData.leadsource_subcategory.value,
                                        formData.interest.value,
                                        formData.communication_notes.value,
                                        formData.intro_offer.value,
                                        formData.intro_notes.value,
                                        formData.dojo_notes.value,
                                        "",
                                        "",
                                        formData.gender.value,
                                        formData.street_address.value,
                                        formData.city.value,
                                        formData.state.value,
                                        formData.zip.value,
                                        formData.date_ofbirth.value
                                    ]
                                ]
                            }]
                              //"valueInputOption": "USER_ENTERED"
                                
                            })
                              .then(function(response) {
                                      // Handle the results here (response.result has the parsed body).
                                      console.log("Response", response.result);
                                      //childRows = $('#newLeads').DataTable().rows($('.shown'));
                                      //$("#newLeads").DataTable().ajax.reload(null, false);
                                      console.log("reloading table now....");
                                      ajaxReload();
                                    },
                                    function(err) { console.error("Execute error", err); });
                    }
                    
                }
            });
        },
        function(err) { console.error("Execute error", err); });
}

function addNewRecord(formObject){
    var formInfo = {
        //record_id : new Date().getTime(),
        add_constantcontact: "",
        age_class: formObject.age_class.value,
        city: "",
        communication_notes: formObject.communication_notes.value,
        date_ofbirth:"",
        dojo_location: formObject.dojo_location.value,
        dojo_notes: formObject.dojo_notes.value,
        email: formObject.email.value,
        gender: formObject.gender.value,
        inquire_date: formObject.inquire_date.value,
        interest: "",
        intro1_attended: "",
        intro1_date: formObject.intro1_date.value,
        intro1_endtime: "",
        intro1_starttime: "",
        intro1_time: (formObject.intro1_time.value).getTime(),
        intro2_attended:"",
        intro2_date:"",
        intro2_endtime:"",
        intro2_starttime:"",
        intro2_time:"",
        intro_notes: formObject.intro_notes.value,
        intro_offer: formObject.intro_offer.value,
        lastcontact_date: formObject.lastcontact_date.value,
        lead_date: formObject.lead_date.value,
        lead_firstname: formObject.lead_firstname.value,
        lead_lastname: formObject.lead_lastname.value,
        leadsource: formObject.lead_source.value,
        leadsource_subcategory: formObject.leadsource_subcategory.value,
        participant_firstname: formObject.participant_firstname.value,
        participant_lastname: formObject.participant_lastname.value,
        phone: formObject.phone.value,
        prospect_phase: formObject.prospect_phase.value,
        send_introsheet: "",
        state: "",
        street_address: "",
        student_status: "",
        zip: ""
    }

    fetch(appURL,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(formInfo) // body data type must match "Content-Type" header
      })
        .then($('#unCloseable').modal('show'))
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .then(function(){
            ajaxReload();
        });
    console.log("Transmission sent...");
}


function resetEditForm(){
    document.getElementById("editForm").reset();
  }

function getAge(dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }
    return age;
}

//Edit to handle the same thing as the refresh button
function ajaxReload(){
    console.log("ajax reload begin");
    childRows = $('#newLeads').DataTable().rows($('.shown'));
      //var tr = $(this).closest('tr');
      var tr = $('#newLeads').DataTable().rows($('.shown'));
      var row = $('#newLeads').DataTable().row(tr);
      if (childRows) {
          childRows.every(function (rowIdx, tableLoop, rowLoop) {
              console.log("There is a shown child row present on Ajax load");
              d = this.data();
              this.child($(format(d))).show();
              this.nodes().to$().addClass('shown');
              $('div.slider', row.child()).slideDown();                        
              console.log('I was shown from Ajax reload');
          });
          // Reset childRows so loop is not executed each draw
          //childRows = null;
      };   
     $('#newLeads').DataTable().ajax.reload(null, false);
     console.log("Table updated!");
     console.log("Child Rows after Ajax reload: "+childRows);
     $('#myModal').modal('hide');
     $('#unCloseable').modal('hide'); 
  }

function dropdownStack(){
    dojoLocationDropdown(dojoLocations);
    studentStatusDropdown(studentStatuses);
    ageClassDropdown(ageClasses);
    intro1TimeDropdown(intro1Times);
    intro2TimeDropdown(intro2Times);
    leadSourceDropdown(leadSources);
    leadSourceSubcategoryDropdown(leadSourceSubcategories);
    prospectPhaseDropdown(prospectPhases);
    introOfferDropdown(introOffers);
    introNotesDropdown(introNotes); 
  }
  
  function newEntryDropdownStack(){
    dojoLocationDropdown(dojoLocations);
    studentStatusDropdown(studentStatuses);
    ageClassDropdown(ageClasses);
    intro1TimeDropdown(intro1Times);
    leadSourceDropdown(leadSources);
    leadSourceSubcategoryDropdown(leadSourceSubcategories);
    prospectPhaseDropdown(prospectPhases);
    introOfferDropdown(introOffers);
    introNotesDropdown(introNotes);
  }

  //POPULATE DROPDOWN SELECTORS
  function dojoLocationDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('dojo_location');  
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  function studentStatusDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('student_status');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  function ageClassDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('age_class');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  function intro1TimeDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro1_time');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = new Date("2020-01-01 "+ values[i]+":00 PM").getHours() +":"+ new Date("2020-01-01 "+ values[i]+":00 PM").getMinutes();
      option.text = values[i];
      list.appendChild(option);
    }
  }

  function intro2TimeDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro2_time');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = new Date("2020-01-01 "+ values[i]+":00 PM").getHours() +":"+ new Date("2020-01-01 "+ values[i]+":00 PM").getMinutes();
      option.text = values[i];
      list.appendChild(option);
    }
  }  

  function leadSourceDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('lead_source');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  function leadSourceSubcategoryDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('leadsource_subcategory');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }  

  function prospectPhaseDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('prospect_phase');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  function introOfferDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro_offer');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  function introNotesDropdown(values){ //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('intro_notes');   
    for (var i = 0; i < values.length; i++){
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }

  $("#myModal").on('hidden.bs.modal',function(){
        $(this).find('#myForm')[0].reset();
        $(this).find('.modal-title').text("New Record");
    });

function format(d){
    // `d` is the original data object for the row
  return '<div class="slider" style="width:100%">'+
        '<form id="editForm">'+
        '<div class="container">'+
                '<input  type="hidden" id="record_id" name="record_id" value="'+d.gsx$recordid.$t+'">'+
                '<div class="row p-2">'+
                  '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                  '<br>'+
                    '<label for="dojo_location">Dojo Location</label>'+
                      '<select class="form-control" id="dojo_location" name="dojo_location">'+
                        '<option>'+d.gsx$dojolocation.$t+'</option>'+
                      '</select>'+
                    '<label for="lead_date ">Lead Date</label>'+
                      '<input class="form-control" type="date" id="lead_date" name="lead_date" value="'+d.gsx$leaddate.$t+'">'+
                    '<label for="inquire_date">Inquire Date</label>'+
                      '<input class="form-control" type="date" id="inquire_date" name="inquire_date" value="'+d.gsx$inquiredate.$t+'">'+
                    '<label for="student_status">Student Status</label>'+
                      '<select class="form-control" id="student_status" name="student_status">'+
                        '<option>'+d.gsx$studentstatus.$t+'</option>'+
                      '</select>'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                    '<br>'+
                    '<label for="lead_firstname">First Name</label>'+
                      '<input class="form-control" type="text" id="lead_firstname" name="lead_firstname" value="'+d.gsx$leadfirstname.$t+'">'+
                    '<label for="lead_lastname">Last Name</label>'+
                      '<input class="form-control" type="text"  id="lead_lastname" name="lead_lastname" value="'+d.gsx$leadlastname.$t+'">'+
                    '<label for="email">Email</label>'+
                      '<input class="form-control" type="email"  id="email" name="email" value="'+d.gsx$email.$t+'">'+
                    '<label for="phone">Phone</label>'+
                      '<input class="form-control" type="text"  id="phone" name="phone" value="'+d.gsx$phone.$t+'">'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary">'+
                    '<br>'+
                    '<label for="lastcontact_date">Last Contact Date</label>'+
                      '<input class="form-control" type="date"  id="lastcontact_date" name="lastcontact_date" value="'+d.gsx$lastcontactdate.$t+'">'+
                    '<label for="leadsource">Lead Source</label>'+
                      '<select class="form-control"  id="lead_source" name="leadsource">'+
                        '<option>'+d.gsx$leadsource.$t+'</option>'+
                      '</select>'+
                    '<label for="leadsource_subcategory">Leadsource Subcategory</label>'+
                      '<select class="form-control"  id="leadsource_subcategory" name="leadsource_subcategory">'+
                        '<option>'+d.gsx$leadsourcesubcategory.$t+'</option>'+
                      '</select>'+
                    '<label for="prospect_phase">Prospect Phase</label>'+
                      '<select class="form-control"  id="prospect_phase" name="prospect_phase">'+
                        '<option>'+d.gsx$prospectphase.$t+'</option>'+
                      '</select>'+
                  '</div>'+
                  '<div class="col-3 text-start border border-5 border-secondary border-start-0">'+
                    '<br>'+
                      '<label for="address" class="" >Address</label>'+
                        '<input class="form-control" type="text" id="address" name="street_address" value="'+d.gsx$streetaddress.$t+'">'+
                      '<label for="city" class="" >'+"City"+'</label>'+
                        '<input class="form-control" type="text" id="city" name="city" value="'+d.gsx$city.$t+'">'+
                      '<label for="state" class="">'+"State"+'</label>'+
                        '<input class="form-control" type="text"  id="state" name="state" value="'+d.gsx$state.$t+'">'+
                      '<label for="zip" class="" >'+"Zip"+'</label>'+
                        '<input class="form-control" type="text" id="zip" name="zip" value="'+d.gsx$zip.$t+'">'+
                      '<br>'+
                  '</div>'+ 
                '</div>'+  

                '<div class="row p-2">'+
                    '<div class="col-6 text-start border border-5 border-secondary border-end-0">'+
                        '<label for="communication_notes" class="p-2 ">Call Center Notes</label>'+
                          '<textarea class="form-control" id="communication_notes" name="communication_notes" rows="5">'+d.gsx$communicationnotes.$t+'</textarea>'+
                      '<br>'+
                    '</div>'+
                    '<div class="col-6 text-start border border-5 border-secondary border-start-0">'+
                        '<label for ="dojo_notes" class="p-2" >Dojo Notes</label>'+
                          '<textarea class="form-control" id="dojo_notes" rows="5" name="dojo_notes">'+d.gsx$dojonotes.$t+'</textarea>'+
                        '<br>'+
                    '</div>'+
                '</div>'+

                '<div class="row p-2">'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="participant_firstname" class="" >'+"Participant First Name"+'</label>'+
                          '<input class="form-control" type="text" id="participant_firstname" name="participant_firstname" value="'+d.gsx$participantfirstname.$t+'">'+
                        '<label for="participant_lastname" class="" >'+"Participant Last Name"+'</label>'+
                          '<input class="form-control" type="text" id="particpant_lastname" name="participant_lastname" value="'+d.gsx$participantlastname.$t+'">'+
                        '<label for="gender" class="" >'+"Gender"+'</label>'+
                          '<select class="form-control" id="gender" name="gender">'+
                              '<option>'+d.gsx$gender.$t+'</option>'+
                              '<option>Male</option>'+
                              '<option>Female</option>'+
                              '<option>Non-binary / other</option>'+
                          '</select>'+
                      '<div class="row">'+
                      '<div class="col-6">'+
                        '<label for="date_ofbirth" class="">'+"DOB"+'</label>'+
                          '<input class="form-control" type="date" id="date_ofbirth" name="date_ofbirth" value="'+d.gsx$dateofbirth.$t+'">'+
                      '</div>'+                           
                        //AGE NEEDS TO BE AUTOMATICALLY CALCULATED
                      '<div class="col-6">'+
                        '<label for="age" class="">'+"Age"+'</label>'+
                          '<input class="form-control" type="text" id="age" value="'+(getAge(new Date(d.gsx$dateofbirth.$t).toString()))+'">'+ 
                      '</div>'+ 
                      '</div>'+
                        '<label for="age_class" class="" >'+"Age Class"+'</label>'+
                          '<select class="form-control" id="age_class" name="age_class">'+
                            '<option>'+d.gsx$ageclass.$t+'</option>'+
                          '</select>'+
                        '<br>'+                                                                                         
                    '</div>'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="intro1_date" class="" >'+"Intro 1 Date"+'</label>'+
                          '<input class="form-control" type="date" id="intro1_date" name="intro1_date" value="'+d.gsx$intro1date.$t+'">'+
                        '<label for="intro1_time" class="" >'+"Intro 1 Time"+'</label>'+
                          '<select class="form-control" id="intro1_time" name="intro1_time">'+
                              '<option>'+d.gsx$intro1time.$t+'</option>'+
                          '</select>'+
                        '<label for="intro1_attended" class="">'+"Intro 1 Attended"+'</label>'+
                          '<select class="form-control" id="intro1_attended" name="intro1_attended">'+
                            '<option>'+d.gsx$intro1attended.$t+'</option>'+
                            '<option></option>'+
                            '<option>Yes</option>'+
                            '<option>No</option>'+
                          '</select>'+
                        '<br>'+
                        '<div class="text-center">'+
                          '<button class="btn btn-secondary intro1Calendar" type="button">Add to Calendar</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-3 text-start border border-5 border-secondary border-end-0">'+
                        '<br>'+
                        '<label for="intro2_date" class="" >'+"Intro 2 Date"+'</label>'+
                          '<input class="form-control" type="date" id="intro2_date" name="intro2_date" value="'+d.gsx$intro2date.$t+'">'+
                        '<label for="intro2_time" class="" >'+"Intro 2 Time"+'</label>'+
                          '<select class="form-control" id="intro2_time" name="intro2_time">'+
                              '<option>'+d.gsx$intro2time.$t+'</option>'+
                          '</select>'+
                        '<label for="intro2_attended" class="">'+"Intro 2 Attended"+'</label>'+
                          '<select class="form-control" id="intro2_attended" name="intro2_attended">'+
                            '<option>'+d.gsx$intro2attended.$t+'</option>'+
                            '<option></option>'+
                            '<option>Yes</option>'+
                            '<option>No</option>'+
                          '</select>'+
                        '<br>'+
                        '<div class="text-center">'+
                          '<button class="btn btn-secondary intro2Calendar" type="button">Add to Calendar</button>'+
                        '</div>'+
                        '<br>'+
                    '</div>'+                    
                    '<div class="col-3 text-start border border-5 border-secondary">'+  
                      '<br>'+
                        '<label for="interest" class="" >'+"Interest"+'</label>'+
                          '<input class="form-control" type="text" id="interest" name="interest" value="'+d.gsx$interest.$t+'">'+  
                        '<label for="intro_offer" class="" >'+"Offer"+'</label>'+
                          '<select class="form-control" id="intro_offer" name="intro_offer">'+
                            '<option>'+d.gsx$introoffer.$t+'</option>'+
                            '<option></option>'+   
                          '</select>'+ 
                        '<label for="dojo_notes" class="" >'+"Intro Notes"+'</label>'+
                          '<select class="form-control" id="intro_notes" name="intro_notes">'+
                            '<option>'+d.gsx$intronotes.$t+'</option>'+
                            '<option></option>'+   
                          '</select>'+ 
                        '<br>'+
                        '<div class="text-center">'+
                          '<button class="btn btn-secondary welcomeForm" type="button">Send Welcome Form</button>'+
                        '</div>'+                                                                                                                    
                    '</div>'+               
                '</div>'+
                '<div class="text-center">'+
                  '<button type="button" class="btn btn-secondary col-1" id="editFormReset" onClick="resetEditForm()">Cancel</button>'+
                  '<button type="button" class="btn btn-primary col-1" id="formSubmitButton" formtarget="_blank" onClick="updateRow(editForm,'+d.gsx$recordid.$t+')">Save</button>'+  
                '</div>'+          
        '</div>'+
        '</form>'+
    '</div>';
}


function newLeadsInit(){
        var childRows = null;
        var table = $('#newLeads').DataTable( {
        //"mark": true,
        "searchHighlight": true,
        "dom": "BQlfritp",
        "stateSave": true,
        "bServerSide":false,
        "bProcessing":true,
        "sAjaxDataProp": "feed.entry",
        "sAjaxSource": "https://spreadsheets.google.com/feeds/list/1HdgnSTtfFPBr5obA2hyuhLOqdaA2bmqIShW9IKVWNn0/1/public/full?alt=json",
        "aoColumns": [
        { "data": null, 
            "defaultContent" : "",
            "className": "details-control",
            "width": "5px"
        }, 
        { "title": "Inquiry Date",
            "mDataProp": "gsx$inquiredate.$t"
        },
        { "title": "Location",
            "mDataProp": "gsx$dojolocation.$t"
        },
        {
            "title": "Lead Name",
            "data": null,
            "render": function (data,type,row){
            return row.gsx$leadfirstname.$t+" "+row.gsx$leadlastname.$t
            }
        },
        {
            "title": "Phone",
            "mDataProp": "gsx$phone.$t"
        },
        {
            "title": "Email",
            "mDataProp": "gsx$email.$t"
        },
        {
            "title": "Last Action Date",
            "mDataProp": "gsx$lastcontactdate.$t"
        },
        {
            "title": "Source",
            "mDataProp": "gsx$leadsource.$t"
        },
        {
            "title": "Prospect Phase",
            "mDataProp": "gsx$prospectphase.$t"
        },
        { "data": null,
            "title": "", 
            "defaultContent" : '<i class="fa fa-backspace"></i>',
            "className": "delete-button",
        },  
        ],
        "buttons":{
        "buttons":[
            { "extend": "csv", "text":'<i class="far fa-file-excel"></i>', "className": 'btn btn-secondary btn-block' },
            { "extend": 'pdf', "text":'<i class="far fa-file-pdf"></i>', "className": 'btn btn-secondary btn-block' },
            {
            "text": '<i class="fas fa-sync"></i>',
            "action": function (dt){
                childRows = table.rows($('.shown'));
                table.ajax.reload(null, false);
                console.log('Refresh button clicked');
            },
            "className": "btn btn-secondary btn-block",
            },
            {
            "text": '<i class="fas fa-plus"></i>',
            "className": "btn btn-danger btn-block attr-test-btn",
            "action": function (dt){
                console.log("add new record button clicked");
                document.getElementById("myForm").reset();
                $('.attr-test-btn')
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '.modal-attr-test');
            }
            },
        ],       
        },
        "initComplete": function(){
        childRows = table.rows($('.shown'));
        newEntryDropdownStack();
        },    
        "order": [[1, "desc"]]
    });

    $('#newLeads tbody').on('click', 'td.details-control', function () {
        childRows = table.rows($('.shown'));
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
          $('div.slider',row.child()).slideUp(function(){
                    row.child.hide();
                    tr.removeClass('shown');
                } );     
            }
        else
            {
            if ( table.row( '.shown' ).length ) {
                      $('.details-control', table.row( '.shown' ).node()).click();
              }
              row.child( format(row.data()) ).show();
              dropdownStack();
              tr.addClass('shown');
              $('div.slider', row.child()).slideDown();
        }
    });

    $('#newLeads tbody').on('click', 'button.intro1Calendar',function(){
        console.log("Calendar1 button clicked!");
        var tr = $('#newLeads tbody tr.shown');
        console.log(tr);
        var row = table.row(tr);
        console.log(row.data());
        var data = row.data();
        checkCalendarEvents(data);
      });
    
      $('#newLeads tbody').on('click', 'button.intro2Calendar',function(){
        console.log("Calendar2 button clicked!");
        var tr = $('#newLeads tbody tr.shown');
        var row = table.row(tr);
        console.log(row.data());
        var data = row.data();
        checkCalendarEvent(data);
      });

      $('#newLeads tbody').on('click', 'button.welcomeForm',function(){
        console.log("Welcome Form button clicked!!");
        var tr = $('#newLeads tbody tr.shown');
        var row = table.row(tr);
        console.log(row.data());
        var data = row.data();
        appScriptTest(data);
      });

    $('#newLeads tbody').on('click', 'td.delete-button', function(){
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var response = confirm("Would you like to delete record "+row.data().gsx$recordid.$t+"?");
        if (response){
            deleteRow(row.data());
        }
      });
      $('#newLeads').on('draw.dt', function (){  
        console.log("Child rows at draw: "+childRows);
          var tr = $(this).closest('tr');
          var row = table.row(tr);
          if (childRows) {
              childRows.every(function (rowIdx, tableLoop, rowLoop) {
                  console.log("There was a child row present on draw.");
                  d = this.data();
                  this.child($(format(d))).show();
                  this.nodes().to$().addClass('shown');
                  $('div.slider', row.child()).slideDown();
                  console.log('I was shown on table draw');
              });
            //clear the child rows so the loop doesn't execute again, and so that the previously shown row doesn't get shown again.
            //childRows = null;
          } else {
            console.log("Nothing to see here...")
          }
        console.log("Table drawn");   
        
        
      }).dataTable();


}