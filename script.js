
let counter1 = 0; //It will help us to define which section is currently displaying
//previous page (in the console we got an error when we scrolled up because the next page was -1 and we don't have it)

let counter2 = 1; //to maintain the last value
//next page (in the console ww got an error when we scrolled down because the next page was 6 and we don't have section-6)

let bool = true;

//select all the sections
const sections = document.querySelectorAll('section'); 

//select the heading
const progress = document.querySelector('.progress h2'); 

//each circle
const circles = document.querySelectorAll('.circle');


//scale changing effect
const section1Wrapper = document.querySelector('.section-1-wrapper');
section1Wrapper.style.transform = 'scale(1)'; //so when we load the project, we need the scale to be 1 by default only for the first page.

const section5Wrapper = document.querySelector('.section-5-wrapper');


//progress bar
//function where we can make the heading dynamic and can also take care of the circles.
const progressCounter = () => {
    progress.textContent = `${counter2}/${sections.length}` 
    //counter2 because we need to change the content of the heading as the right side of it.
    //counter2 because it is starting with 1 and goes through 5.
    //textContent to change the context of the element 

    //loop through the circles and assign to them a transparent background color
    Array.from(circles).forEach((circle) => { //an array of circles
        circle.style.backgroundColor = 'transparent';
    })
    //then once we scroll, the proper circle will get the a different background
    document.querySelector(`.circle-${counter2}`).style.backgroundColor = '#ddd';
}
//but if I reload the page, then the first circle won't have any background -> style.css file

// **!
//the first page is displaying with a larger scale and it happens because boolean is false and if statements are working in the page controller function.

// pageController() function so we don’t repeat these lines of code
const pageController = () => {
    bool = true;
    //So if counter 1 equals 5, then it means that the footer is displaying and we no longer need to scroll this page
    if(counter1 === 5){
        //So we have to loop through these sections and make their left position zero 
        Array.from(sections).forEach((section) => { // forEach to loop through these sections array
            section.style.left = '0'; //all the sections will move to the right once we reach the footer and try to go to the 6th page
        })
        //we have to reset both counters back to their default values
        counter1 = 0; 
        counter2 = 1;

        // **!
        //if the first if statement is true, meaning that 
        //if we navigate from the footer to the first page, then we need to decrease the scale of the first section wrapper
        //And at the same time we need to increase the scale of the footer
        section1Wrapper.style.transform = 'scale(1)';
        section5Wrapper.style.transform = 'scale(1.5)';
        
        progressCounter(); //here too
        bool = false; //replaced return with this line of code
        //return; //to terminate the execution of any other code in this function
    }

    // to take care of the issue, when the first page is displaying and if we scroll up, then we get an error saying cannot read property style of null.
    // So we have to check the case when the counter1 equals -1 . 
    // In that case, we have to move all the sections to the left side by -100vw and we have to display the footer.
    if(counter1 === -1){ //If it is true, we have to loop through the sections list.
        Array.from(sections).forEach((section) => { //trasformed into an array
            if(section.classList[0] === 'section-5'){ // to check if the first class name of the current item in the array equals section-5
                return; //if this condition is true, we have to terminate executing this function by using the return statement.
            }
            section.style.left = '-100vw'; //if not true we have to give all the sections (except the section 5) 
            // a left position with the value -100vw
            //all the sections will move to the left when we try to go to the previous page -1
        })
        counter1 = 4; //section-4
        counter2 = 5; //so the footer will be displaying on the page
        
        //opposite scale values
        section1Wrapper.style.transform = 'scale(1.5)';
        section5Wrapper.style.transform = 'scale(1)';

        progressCounter(); //we call the function in the if statement 
        bool = false;
    }
    progressCounter(); //we call it here too
    return bool; //here we return the bool itself
}

//to attach an event listener to the global window object
//the wheel event is also fired by two-finger scrolling on a touchpad
window.addEventListener('wheel', (e) => {

    // we're interested in the property called Delta Y
    // if we scroll the page down and is equals to 100.
    // if we scroll up deltaY property should be equal to -100.
    //So if the value of deltaY is POSITIVE -> navigate to the next page (to the right)
    //And if it is NEGAVTIVE -> navigate to the previous page (to the left)

    const deltaY = e.deltaY > 0; //if greater than 0 -> condition stored in the variable deltaY
    if(deltaY){ //if true
        counter1++; //increment operator
        counter2++;
        //once we scroll down, then the counter will increase by one.    // ****
    } else{ //if false
        counter1--;
        counter2--;
        //but if I scroll up, then it will decrease by one.     // ****
    }

    pageController(); // we call it inside the wheel event and this     if(counter1 === -1) will run because of the decrease operator
    progressCounter(); //we call the function here too
    console.log(counter1, counter2);

    // ****
    //So based on that logic, we can navigate to the different sections.
    //And for that we have to select section element -> (`.section-${}`)

    //ternary operator where we can select one of the two values depending on the condition.
    //so we have to run this code once the boolean is true that's why && (and operator is true when both conditions are true)
    // bool && (document.querySelector(`.section-${deltaY ? counter1 : counter2}`).style.left = `${deltaY ? "-100vw" : "0"}`); 
    //So if this is true, move this section to the left side by -100 viewport width. 
    //and if it is false, then we need zero.

    //where we check if the bool is true or false.
    //if it is true, we have to decrease the scale of the proper section.
    //we transform this conditional statement into an if statement.
    if(bool){
        (document.querySelector(`.section-${deltaY ? counter1 : counter2}`).style.left = `${deltaY ? "-100vw" : "0"}`); 
        
        //we need to select the section wrapper
        document.querySelector(`.section-${deltaY ? counter1 : counter2}-wrapper`).style.transform = `scale(${deltaY ? "1.5" : "1"})`;
        //once the proper section wrapper is selected, then we have to decrease the scale or leave it as it is.
        //And as the value we check if Delta Y is true or false.
        //if it is true, as the value of the scale function, we have to pass 1.5, if false 1

        //So when we scroll down the page, then the number of the section wrapper will become counter one.
        // If we scroll up, then Delta y will be false. 
        // The number of the section wrapper will become counter2 which on the other hand will decrease by one.
        // And we will select again the previous page, and in this case its scale will be decreased because Delta y is false.

        //so the other pages works too
        document.querySelector(`.section-${deltaY ? counter1+1 : counter2+1}-wrapper`).style.transform = `scale(${deltaY ? "1" : "1.5"})`;
        // we need to manipulate the next page and we need to increase both counters by one.
        //And we have to change the places of the scale values.
        // so now if we scroll down, then the next coming pages will change their scales as well.
    }
})


//to select both buttons and attach to them event listeners with a click
document.querySelector('.left-btn').addEventListener('click', () =>{
    //once we click the left button, we have to decrease both counters by one.
    counter1 --;
    counter2 --;
    //to navigate to the different pages, we have to change the left position for this actions.
    //with the left button, we will define section numbers by using counter2.
    pageController() && (document.querySelector(`.section-${counter2}`).style.left = '0'); //0 to the right
    //If the page controller function returns true, then we need to run this code here.
    //And if it returns false, then just pageController() function will be executed
    console.log(counter1, counter2);

    //So if the boolean is true, then we need to define the scales for the section wrappers
    //And if it is false, then the page controller function will manage it automatically
    if(bool){
        //So this code refers to the coming page.
        document.querySelector(`.section-${counter2}-wrapper`).style.transform = 'scale(1)';
        //As for the leaving one.
        document.querySelector(`.section-${counter2+1}-wrapper`).style.transform = 'scale(1.5)';
    }

})
document.querySelector('.right-btn').addEventListener('click', () =>{
    //once we click the right button, we need to increase both counters by one.
    counter1 ++;
    counter2 ++; 
    //As for the right button, we will need counter1
    pageController() && (document.querySelector(`.section-${counter1}`).style.left = '-100vw'); //-100vw to the left
    //once we reach to the footer and click again, we will face to the same issues which we had in case of wheel event.
    //so if the page controller function returns true, then we need to run that line of code with the && operator
    //And if it returns false, then just pageController() function will be executed
    console.log(counter1, counter2);

    if(bool){
        //So this code refers to the coming page.
        document.querySelector(`.section-${counter2}-wrapper`).style.transform = "scale(1)";
        //As for the leaving one here we only need counter1
        document.querySelector(`.section-${counter1}-wrapper`).style.transform = "scale(1.5)";
    }

})

//once we mouse over the image, then we have to decrease the opacity of section wrapper.
document.querySelector('.grapes-img').addEventListener('mouseover', () =>{
    document.querySelector('.section-3-wrapper').style.opacity = '0.5'
})
//when we mouse out, we need to increase it back to one.
document.querySelector('.grapes-img').addEventListener('mouseout', () =>{
    document.querySelector('.section-3-wrapper').style.opacity = '1'
})


//hamburger menu 
const menu = document.querySelector('.menu');

menu.addEventListener('click', () =>{
    document.querySelector('.navbar').classList.toggle('change');
});
//we added a new class to the whole navbar div



