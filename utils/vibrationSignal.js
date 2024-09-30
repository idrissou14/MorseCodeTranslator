
    const generateMorseVibration = (morse) => {
        const vibrationPattern = [];
    
        morse.split('').forEach(element => {
              if(element === '.'){
                 vibrationPattern.push(200) 
              }
              else if(element === '-'){
                 vibrationPattern.push(600) 
              }
              else if(element ===''){
                 vibrationPattern.push(1400) 
              }
              vibrationPattern.push(200)
        });
    
        return vibrationPattern;
    }

export {generateMorseVibration} ;