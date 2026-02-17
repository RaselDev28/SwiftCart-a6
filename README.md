# Assignment

1.	What is the difference between null and undefined?

Ans: 
Undefined: যখন একটা ভেরিয়েবল ডিক্লেয়ার করা হয় কিন্তু কিছু এসাইন করা হয়না বা মান নির্ধারন করা হয়না তখন এ ভেরিয়েবলটি Undefined হবে। এটি এক ধরনের প্রিমিটিভ ডাটা টাইপ। এই ডেটা টাইপের একটাই মান সেটা হচ্ছে Undefined.

Null: null এবং undefined প্রায় একই ধরনের ডাটা টাইপ। এখানে মূল পার্থক্য হচ্ছে null ভেরিয়েবলের মান এসাইন করতে পারে কিন্তু undefined কোনো মান এসাইন করতে পারেনা। অর্থাৎ ইচ্ছাকৃতভাবে যদি কোনো ভেরিয়েবলের মান null সেট করা হয় তখন সেটি (null)হবে।

2.	What is the use of the map () function in JavaScript? How is it different between forEach()?

Ans: 
map () একটি array মেথড, যা একটি array এর প্রতিটি element এর উপর কাজ করে আবার একটি array রিটার্ন করে।

* map () এবং forEach () ফাংশনের মূল পার্থক্য হচ্ছে map () নতুন একটি array তৈরী করে আর forEach () শুধু loop চালায়। এবং map () নতুন array return করে কিন্তু forEach () কিছুই return করে না।

3. What is the difference between == and ===?

Ans: 
== এবং === এর মধ্যে মূলত পার্থক্য হলো == অপারেটর শুধুমাত্র value চেক করে return করে কিন্তু === অপারেটর value এর সাথে সাথে type ও চেক করে return দেয়।

4.	What is the significance of async/await in fetching API data?

Ans:
async/await JavaScript এ API থেকে ডাটা fetch  করার কাজকে সহজ ও readable করে।
Async/await JavaScript এর asynchronous data কে synchronous ভাবে সাজিয়ে কোড লেখার জন্য সহজ করে দেয়।

5.	Explain the concept of Scope in JavaScript (Global, Function, Block).

Ans: Scope হলো কোডের সেই অংশ যেখানে কোনো variable বা function access করা যায়।

*Global Scope: যে variable পুরো program-এর যেকোনো জায়গা থেকে access করা যায়, সেটি global scope এ থাকে।

*Block Scope: { } এর ভিতরে declare করা variable, যেটা শুধু সেই block-এর ভিতরেই কাজ করে—তাকে block scope বলে।

*Function Scope: যে variable শুধুমাত্র কোনো function-এর ভিতরে access করা যায়, সেটি  function scope.
