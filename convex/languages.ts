import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllLanguages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("languages").collect();
  },
});

export const getLanguageBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("languages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const seedLanguages = mutation({
  args: {},
  handler: async (ctx) => {
    const existingLanguages = await ctx.db.query("languages").collect();
    if (existingLanguages.length > 0) {
      return "Languages already seeded";
    }

    const languages = [
      {
        name: "Python",
        icon: "🐍",
        slug: "python",
        description: "Python is a high-level, interpreted programming language known for its simple syntax and readability.",
        purpose: "Perfect for beginners, data science, web development, automation, and artificial intelligence.",
        concepts: [
          {
            title: "Variables",
            description: "Store data in named containers",
            example: `name = "Alice"
age = 25
is_student = True`
          },
          {
            title: "Functions",
            description: "Reusable blocks of code",
            example: `def greet(name):
    return f"Hello, {name}!"

message = greet("World")`
          },
          {
            title: "Loops",
            description: "Repeat code multiple times",
            example: `for i in range(5):
    print(f"Count: {i}")

numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num * 2)`
          }
        ],
        resources: {
          websites: [
            {
              name: "Python.org Tutorial",
              url: "https://docs.python.org/3/tutorial/",
              description: "Official Python tutorial for beginners"
            },
            {
              name: "freeCodeCamp Python",
              url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
              description: "Free interactive Python course"
            },
            {
              name: "W3Schools Python",
              url: "https://www.w3schools.com/python/",
              description: "Comprehensive Python reference and tutorials"
            }
          ],
          videos: [
            {
              name: "Python for Everybody",
              url: "https://www.youtube.com/watch?v=8DvywoWv6fI",
              description: "Complete Python course by freeCodeCamp"
            },
            {
              name: "Corey Schafer Python Tutorials",
              url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU",
              description: "In-depth Python tutorials for beginners"
            }
          ],
          books: [
            {
              name: "Automate the Boring Stuff with Python",
              author: "Al Sweigart",
              description: "Practical programming for total beginners (free online)"
            },
            {
              name: "Python Crash Course",
              author: "Eric Matthes",
              description: "A hands-on, project-based introduction to programming"
            }
          ]
        }
      },
      {
        name: "JavaScript",
        icon: "⚡",
        slug: "javascript",
        description: "JavaScript is the programming language of the web, enabling interactive websites and modern web applications.",
        purpose: "Essential for web development, both frontend and backend, mobile apps, and desktop applications.",
        concepts: [
          {
            title: "Variables",
            description: "Store and manipulate data",
            example: `let name = "Alice";
const age = 25;
var isStudent = true;`
          },
          {
            title: "Functions",
            description: "Reusable code blocks",
            example: `function greet(name) {
    return \`Hello, \${name}!\`;
}

const add = (a, b) => a + b;`
          },
          {
            title: "Loops",
            description: "Iterate through data",
            example: `for (let i = 0; i < 5; i++) {
    console.log(\`Count: \${i}\`);
}

const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num * 2));`
          }
        ],
        resources: {
          websites: [
            {
              name: "MDN Web Docs",
              url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
              description: "Comprehensive JavaScript documentation and tutorials"
            },
            {
              name: "freeCodeCamp JavaScript",
              url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
              description: "Interactive JavaScript course with projects"
            },
            {
              name: "JavaScript.info",
              url: "https://javascript.info/",
              description: "Modern JavaScript tutorial from basics to advanced"
            }
          ],
          videos: [
            {
              name: "JavaScript Full Course",
              url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
              description: "Complete JavaScript course by freeCodeCamp"
            },
            {
              name: "The Net Ninja JavaScript",
              url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9i9Ae2D9Ee1RvylH38dKuET",
              description: "JavaScript tutorials for beginners"
            }
          ],
          books: [
            {
              name: "Eloquent JavaScript",
              author: "Marijn Haverbeke",
              description: "A modern introduction to programming (free online)"
            },
            {
              name: "You Don't Know JS",
              author: "Kyle Simpson",
              description: "Deep dive into JavaScript fundamentals (free online)"
            }
          ]
        }
      },
      {
        name: "Java",
        icon: "☕",
        slug: "java",
        description: "Java is a robust, object-oriented programming language designed for portability and enterprise applications.",
        purpose: "Widely used for enterprise software, Android development, web backends, and large-scale applications.",
        concepts: [
          {
            title: "Variables",
            description: "Typed variables with explicit declarations",
            example: `String name = "Alice";
int age = 25;
boolean isStudent = true;
double gpa = 3.8;`
          },
          {
            title: "Methods",
            description: "Functions within classes",
            example: `public class HelloWorld {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    
    public static void main(String[] args) {
        System.out.println(greet("World"));
    }
}`
          },
          {
            title: "Loops",
            description: "Iterate with different loop types",
            example: `for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}

int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num * 2);
}`
          }
        ],
        resources: {
          websites: [
            {
              name: "Oracle Java Tutorials",
              url: "https://docs.oracle.com/javase/tutorial/",
              description: "Official Java tutorials from Oracle"
            },
            {
              name: "GeeksforGeeks Java",
              url: "https://www.geeksforgeeks.org/java/",
              description: "Comprehensive Java programming guide"
            },
            {
              name: "W3Schools Java",
              url: "https://www.w3schools.com/java/",
              description: "Java tutorial with examples and exercises"
            }
          ],
          videos: [
            {
              name: "Java Full Course",
              url: "https://www.youtube.com/watch?v=xk4_1vDrzzo",
              description: "Complete Java programming course"
            },
            {
              name: "Derek Banas Java Tutorial",
              url: "https://www.youtube.com/watch?v=WPvGqX-TXP0",
              description: "Java tutorial in one video"
            }
          ],
          books: [
            {
              name: "Head First Java",
              author: "Kathy Sierra & Bert Bates",
              description: "Beginner-friendly approach to learning Java"
            },
            {
              name: "Java: The Complete Reference",
              author: "Herbert Schildt",
              description: "Comprehensive Java programming guide"
            }
          ]
        }
      },
      {
        name: "C++",
        icon: "⚙️",
        slug: "cpp",
        description: "C++ is a powerful, low-level programming language that offers fine control over system resources.",
        purpose: "Used for system programming, game development, embedded systems, and performance-critical applications.",
        concepts: [
          {
            title: "Variables",
            description: "Strongly typed variables",
            example: `#include <iostream>
#include <string>

std::string name = "Alice";
int age = 25;
bool isStudent = true;
double gpa = 3.8;`
          },
          {
            title: "Functions",
            description: "Function definitions and declarations",
            example: `#include <iostream>
#include <string>

std::string greet(std::string name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << greet("World") << std::endl;
    return 0;
}`
          },
          {
            title: "Loops",
            description: "Different types of loops",
            example: `for (int i = 0; i < 5; i++) {
    std::cout << "Count: " << i << std::endl;
}

int numbers[] = {1, 2, 3, 4, 5};
for (int num : numbers) {
    std::cout << num * 2 << std::endl;
}`
          }
        ],
        resources: {
          websites: [
            {
              name: "cplusplus.com",
              url: "https://www.cplusplus.com/doc/tutorial/",
              description: "Comprehensive C++ tutorial and reference"
            },
            {
              name: "GeeksforGeeks C++",
              url: "https://www.geeksforgeeks.org/c-plus-plus/",
              description: "C++ programming tutorials and examples"
            },
            {
              name: "W3Schools C++",
              url: "https://www.w3schools.com/cpp/",
              description: "C++ tutorial with interactive examples"
            }
          ],
          videos: [
            {
              name: "C++ Full Course",
              url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
              description: "Complete C++ programming course"
            },
            {
              name: "The Cherno C++",
              url: "https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb",
              description: "In-depth C++ series for beginners to advanced"
            }
          ],
          books: [
            {
              name: "C++ Primer",
              author: "Stanley Lippman",
              description: "Comprehensive introduction to C++"
            },
            {
              name: "Programming: Principles and Practice Using C++",
              author: "Bjarne Stroustrup",
              description: "C++ from the creator of the language"
            }
          ]
        }
      },
      {
        name: "Dart",
        icon: "🎯",
        slug: "dart",
        description: "Dart is a modern programming language optimized for building fast apps on any platform.",
        purpose: "Primarily used for Flutter mobile app development, but also for web and server-side development.",
        concepts: [
          {
            title: "Variables",
            description: "Type-safe variables with inference",
            example: `String name = "Alice";
int age = 25;
bool isStudent = true;
var gpa = 3.8; // Type inferred as double`
          },
          {
            title: "Functions",
            description: "Functions with optional parameters",
            example: `String greet(String name, [String greeting = "Hello"]) {
  return '$greeting, $name!';
}

void main() {
  print(greet("World"));
  print(greet("Alice", "Hi"));
}`
          },
          {
            title: "Loops",
            description: "Modern loop constructs",
            example: `for (int i = 0; i < 5; i++) {
  print('Count: $i');
}

List<int> numbers = [1, 2, 3, 4, 5];
for (int num in numbers) {
  print(num * 2);
}`
          }
        ],
        resources: {
          websites: [
            {
              name: "Dart.dev",
              url: "https://dart.dev/guides",
              description: "Official Dart documentation and tutorials"
            },
            {
              name: "DartPad",
              url: "https://dartpad.dev/",
              description: "Online Dart editor and playground"
            },
            {
              name: "Flutter Documentation",
              url: "https://flutter.dev/docs",
              description: "Learn Dart through Flutter development"
            }
          ],
          videos: [
            {
              name: "Dart Programming Tutorial",
              url: "https://www.youtube.com/watch?v=Ej_Pcr4uC2Q",
              description: "Complete Dart programming course"
            },
            {
              name: "Flutter & Dart Bootcamp",
              url: "https://www.youtube.com/watch?v=x0uinJvhNxI",
              description: "Learn Dart through Flutter development"
            }
          ],
          books: [
            {
              name: "Learning Dart",
              author: "Ivo Balbaert",
              description: "Comprehensive guide to Dart programming"
            },
            {
              name: "Flutter in Action",
              author: "Eric Windmill",
              description: "Learn Dart through Flutter app development"
            }
          ]
        }
      },
      {
        name: "Rust",
        icon: "🦀",
        slug: "rust",
        description: "Rust is a systems programming language focused on safety, speed, and concurrency.",
        purpose: "Used for system programming, web backends, blockchain, and performance-critical applications.",
        concepts: [
          {
            title: "Variables",
            description: "Immutable by default with ownership",
            example: `let name = "Alice"; // Immutable
let mut age = 25; // Mutable
let is_student: bool = true;
const MAX_SCORE: u32 = 100;`
          },
          {
            title: "Functions",
            description: "Functions with explicit return types",
            example: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let message = greet("World");
    println!("{}", message);
}`
          },
          {
            title: "Loops",
            description: "Safe iteration with ownership",
            example: `for i in 0..5 {
    println!("Count: {}", i);
}

let numbers = vec![1, 2, 3, 4, 5];
for num in &numbers {
    println!("{}", num * 2);
}`
          }
        ],
        resources: {
          websites: [
            {
              name: "The Rust Book",
              url: "https://doc.rust-lang.org/book/",
              description: "Official Rust programming language book (free online)"
            },
            {
              name: "Rust by Example",
              url: "https://doc.rust-lang.org/rust-by-example/",
              description: "Learn Rust through annotated examples"
            },
            {
              name: "Rustlings",
              url: "https://github.com/rust-lang/rustlings",
              description: "Interactive Rust exercises for beginners"
            }
          ],
          videos: [
            {
              name: "Rust Programming Course",
              url: "https://www.youtube.com/watch?v=zF34dRivLOw",
              description: "Complete Rust programming tutorial"
            },
            {
              name: "Let's Get Rusty",
              url: "https://www.youtube.com/c/LetsGetRusty",
              description: "Rust tutorials and explanations"
            }
          ],
          books: [
            {
              name: "Programming Rust",
              author: "Jim Blandy & Jason Orendorff",
              description: "Fast, safe systems development"
            },
            {
              name: "Rust in Action",
              author: "Tim McNamara",
              description: "Systems programming concepts and techniques"
            }
          ]
        }
      }
    ];

    for (const language of languages) {
      await ctx.db.insert("languages", language);
    }

    return "Languages seeded successfully";
  },
});
