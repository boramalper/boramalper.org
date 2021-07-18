---
title: "Modernising a C++ Project"
date: 2020-07-23T14:38:43+03:00
---

During my summer internship at the School of Engineering in The University of Edinburgh, I was responsible for the development of a fluid simulator that consisted of around fifteen thousand lines of C++ code, written by chemical engineers. The code was well written, yet coming from a computer science background, I could see a lot of room for improvement.

> Diagnosing and fixing things is variable, complex, and not of one's own making. It is therefore unknowable and requires a particular disposition toward the thing you are trying to fix. “This disposition is at once cognitive and moral.” Getting things right demands that you be attentive in the way of a conversation rather than assertive in the way of a demonstration. The mechanical arts have a special significance for our time because they cultivate the (less glamorous) virtue of attentiveness over creativity.
>
> <a href="https://openlibrary.org/works/OL13759269W/Shop_class_as_soulcraft"><cite>Shop Class As Soulcraft: An Inquiry Into the Value of Work</cite></a>

This article is aimed to be a practical high-level guide for those (computer/natural scientists) who would like to improve the quality of a C++ codebase and their workflow. I will spare you the excruciating details of how to implement or setup things exactly (which is often easier to figure out by yourself than to try to understand someone else's explanation.)

## Migrate to CMake
In contrast to good-old language-agnostic [make](https://en.wikipedia.org/wiki/Make_(software)), [CMake](https://cmake.org/) is tailored for C++ and is the de-facto choice in the C++ ecosystem, which alone should be a sufficient reason to choose it as you would spend less time fighting your build system.

Ryan A. Pavlik maintains a great collection of [cmake modules](https://github.com/rpavlik/cmake-modules) that you can use. In this project, I have used `GetGitRevisionDescription` module that allowed me to embed the current commit id in my builds (that the simulator prints on start), which has helped with debugging any bugs & regressions that my colleagues reported during our rapid development cycle.

## Use the latest C++
Sometimes you are stuck with unmaintained libraries or old tools that might restrict the range of your choices, but opting for the latest C++ version that you can afford is almost always a great idea without any downsides.

C++ takes great care to preserve backwards-compatibility so the chances of breaking your code by upgrading to a newer C++ version is quite slim. Yet, each new version opens up great opportunities to reduce the number of your 3rd-party dependencies, to make your code more cross-platform, and to increase your productivity through more expressive language constructs.

Check [CMake documentation for `CXX_STANDARD`](https://cmake.org/cmake/help/latest/prop_tgt/CXX_STANDARD.html) to see the list of supported C++ versions, and consult your compiler's documentation ([g++](https://gcc.gnu.org/projects/cxx-status.html) or [clang++](https://clang.llvm.org/cxx_status.html)) to confirm the availability of the new features.

## Setup continuous integration pipelines
[Continuous integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration) is a bit of an overloaded term so it is important to clarify that by CI pipelines I mean the automatically triggered processes such as building and testing of your code and publishing any artefacts of those processes such as pre-compiled binaries and test reports.

What makes CI pipelines so desirable? At every push to the repository:

1. Your project will be built (indicating that there aren't any type or syntax errors that prevent it from compiling).
2. Any unit and integration tests you have developed will be run and checked automatically to ensure you haven't introduced any regressions.
3. Pre-compiled binaries will be ready for distribution.
4. The logs of all these operations will be saved for your reference.
5. Errors will cause the pipeline to fail and you will be alerted through (most often) an e-mail, instead of silently corrupting your codebase.

With a 60 lines-long YAML document, I was able to set up a CI pipeline on our [GitLab](https://gitlab.com/) repository, and considering how little amount of effort I have spent on it, this was the best decision I have taken in the project. Using a cross-compiler (`x86_64-w64-mingw32-g++`), the simulator was built for Windows automatically and my colleagues no longer had to install Windows Subsystem for Linux to run the simulator, or to build it.

## Delegate formatting
Formatting code manually is at best a waste of time, and at worst a waste of time _and_ mental space, trying to remember (or decide on the spot) the formatting rules and applying them. Of course, there is some merit in enforcing a consistent code style, aesthetically and pragmatically (e.g. git diffs, noticing [dangling else](https://en.wikipedia.org/wiki/Dangling_else)).

Instead, delegate formatting to [clang-format](https://clang.llvm.org/docs/ClangFormat.html) and never worry about it again. Clang-format is incredibly flexible, which is both a blessing and a curse if you spend too much time fine-tuning it, so you should be able to configure it to work with your current code style.

## Employ a linter
Linters are static analysis tools that work like compiler warnings but go deeper and beyond to warn you of other suspicious structures in code and to recommend more idiomatic alternatives to common pitfalls.  [clang-tidy](https://clang.llvm.org/extra/clang-tidy/) is a great linter with tons of built-in checks that can help you eliminate much of the code smell.

Tuning your linter, as opposed to your formatter, is a non-trivial task and a quite important one. You aim should be, at all times, to get rid of **all** linter warnings lest you might suffer from [alarm fatigue](https://en.wikipedia.org/wiki/Alarm_fatigue). So instead of enabling all checks and getting desensitized to warnings, try removing all the warnings before enabling more checks.

## Embrace graphical front-ends to command-line tools
Although coming from a CS background you might prefer command-line, many other professionals (and programmers who are at the beginning of their career) feel more at home using graphical tools.

In our team, I have recommended [Sublime Merge](https://www.sublimemerge.com/) as the git front-end and [CLion](https://www.jetbrains.com/clion/) as the IDE (also serving as a front-end to other developing tools, such as the debugger, CMake, and many others!)

For your command-line program (that you are developing yourself), consider writing helper programs or scripts (such as using [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/overview)) to create a primitive graphical  wizard to collect the arguments and then to run your program.

## Reveal the documentation
There is often _some_ documentation of classes, methods, and variables yet it might not be _formatted_ correctly. Unfortunately fixing this might be quite tedious so exercise your judgement to decide whether a particular class/method/variable is worth the effort.

Using [Doxygen](https://en.wikipedia.org/wiki/Doxygen), you can generate reference documentation for your source code, which shall also be accessible (as a tooltip or otherwise) in your IDE.

You shall also consider using [C++ attributes](https://docs.microsoft.com/en-us/cpp/cpp/attributes) such as `[[noreturn]]` and `[[nodiscard]]` to assist the compiler and emphasize certain qualities of functions.

## Conclusion
Modernising a C++ project is quite fun and much more straightforward than one might initially expect if one is to walk the trodden path. Thanks to the countless hours of [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) developers, the tooling, the know-how, and the documentation in the C++ ecosystem is incredibly mature today. By simply following the best practices and leveraging the automation tools, one can go a long way of improving the code quality and saving substantial time & effort.
