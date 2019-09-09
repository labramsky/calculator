# calculator
<h1>Loan Repayment Calculator</h1>

Hello! This was a fun challenge, particularly glad I was able to find the instructions. :) 
Below I've outlined some of my technical choices and what I'd love to do if I had more time.


<h2>Technical Choices</h2>

Languages and tools used: 
<ul>
  <li>JavaScript</li>
  <li>Bootstrap</li>
  <li>HTML & CSS</li>
  <li>Google Fonts</li>
</ul>

All the calculations are done in JavaScript functions, that take the user's entered values 
in the HTML inputs after the user clicks the "Calculate" button. I used Bootstrap to 
achieve as much responsiveness as possible in the short amount of time, focusing on the 
form and side-by-side calculators. 

For the UI, I decided to place all the variables together in one area, so the user could 
immediately understand all their possible form inputs. I also added a "Calculate" button, 
for one clear form submitting experience, rather than auto-changing the calculation results 
on every input change which could be overwhelming. For styling the page, I took inspiration 
from iwoca's website and found a relatively close Google Font to EuclidSquare, and used 
brand colours for consistency.


<h2>Improvements</h2>

With more time, I'd absolutely love to improve various aspects of the webpage, including 
adding testing, accessibility, form validations, and improve the formatting and responsive design.

<h3>Testing</h3>

Ideally, I would have coded this using TDD, with test-first development. Not only does testing make 
you slow down and think about the impact of each bit of code, it reduces risks and saves an enormous 
amount of time overall. If I had more time, I would definitely create test cases and add unit tests 
to this website. As it increased in complexity, I would then add integration and end-to-end tests.

<h3>Accessibility</h3>

For the purpose of this challenge, I implemented accessiblility best practices in ensuring that the 
elements I chose were accurate to their meaning and generally made sense (ex: Headings go from h1 > h2 > etc). 
If I had more time, I'd do thourough accessibility checks with a screen reader and colour contrast tool. 
If there were images, I'd add alt tags, and  I'd ensure every section had a role and aria-label. 

<h3>Form Validations</h3>

Although my form works with perfect user inputs, humans are rather unpredictable, so form validations 
are essential. I'd definitely add in validations, including dates pulling the limits from the end-point. 
(I attempted to connect to the end-point, but got stuck on authentication -- so if I had more time, 
I would love to solve that.) I'd also really like to find a better solution to handling decimals, instead of 
my current method of generally adding a float.

<h3>Formatting & Responsive Design</h3>

I'd like to improve the date formatting and logic. Currently I simply add the months based on the user's desired duration,
but there's currently nothing useful in place if they choose 13 months, so instead I'd like to base the logic on the current date. It would also make me very happy to have had time to improve the responsiveness of the form inputs, so they would look great on mobile.
