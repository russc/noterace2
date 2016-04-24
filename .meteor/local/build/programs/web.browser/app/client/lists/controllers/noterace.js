(function(){angular.module("noterace2").controller("NotesCtrl", ['$scope', '$rootScope', '$meteor', '$firebaseArray',
  function($scope, $rootScope, $meteor, $firebaseArray) {
    var keysigs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Gb', 'C#', 'F#'];
    var notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', '_A', '_B', '_C', '_D', '_D', '_F', '_G',
      '^A', '^B', '^C', '^D', '^E', '^F', '^G'
    ];
    var composers = ['Mozart', 'Bach', 'Haydn', 'Handel', 'Beethoven', 'Ravel', 'Stravinsky', 'Shostakovich', 'Mahler', 'Adams', 'Tchaikovsky', 'Mussorgsky','Wagner','Chopin','Debussy','Liszt','Brahms','Mendelssohn','Schubert','Schumann','Strauss'];
    var supers = ['Bat', 'Super', 'Thor', 'Iron', 'Spider', 'Hulk', 'Captain', 'Hawkeye','Flash','Arrow','Daredevil','Wolverine','Black Widow','Drax','Gamora','Groot','Rocket Raccoon','Star-Lord','Beast','Cyclops','Storm'];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    $scope.racerName = supers[getRandomInt(1, supers.length)] + "-" + composers[getRandomInt(1, composers.length)];
    $scope.score = 0;
    $scope.options = {
      clef: "treble"
    };
    $scope.user = Meteor.user().emails[0].address;
    $scope.racing = false;
    $scope.watchMode = false;


    var races = new Firebase("https://noterace.firebaseio.com/races/current");
    $scope.raceResults = $firebaseArray(races);

    $scope.randomKey = function() {
      var random = keysigs[Math.floor(Math.random() * keysigs.length)];
      return random;
    }
    $scope.randomNote = function() {
      var random = notes[Math.floor(Math.random() * notes.length)];
      return random;
    }
    $scope.notation = function() {
      var key = $scope.randomKey();
      var note = $scope.randomNote();
      $scope.note = note;
      if($scope.options.clef === "bass"){
        note +=',';
      }


      console.log(note);
      var oneNote = "X: \n L:1/4 \n M:none \n K: C clef=" + $scope.options.clef + " \n " + note + "|";
      ABCJS.renderAbc('notation', oneNote, {}, {
        scale: 2.5
      });
    };

    $scope.checkAnswer = function(answer) {
      var ref = new Firebase("https://noterace.firebaseio.com/races/current");
      console.log("selected: " + answer);
      console.log($scope.note);
      if (answer == $scope.note) {
        $scope.graded = "Yes!";
        $scope.score++
          // ref.child($scope.racerName).child('score').set($scope.score);
          ref.child($scope.racerName).set({
            name: $scope.racerName,
            score: $scope.score,
            email: $scope.user
          });
        $scope.notation();
      } else {
        $scope.graded = "No, try again..";
        $scope.score--;
        ref.child($scope.racerName).child('score').set($scope.score);
      }
    };

    $scope.joinRace = function() {
      var ref = new Firebase("https://noterace.firebaseio.com/races/current");
      ref.once("value", function(snapshot) {
        if(snapshot.child($scope.racerName).exists()){
          console.log("creating new name");
          $scope.racerName = supers[getRandomInt(1, supers.length)] + "-" + composers[getRandomInt(1, composers.length)];
          $scope.joinRace();
        } else{
          ref.child($scope.racerName).set({
            name: $scope.racerName,
            score: $scope.score,
            email: $scope.user
          });
          $scope.racing = true;
          $firebaseArray(ref);

        };

      });

    };


    $scope.joinRace();
    $scope.notation();
  }
]);

})();
