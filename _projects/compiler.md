---
title: "Toy compiler(CS160)"
collection: projects
permalink: /projects/compiler
excerpt: "Completed a toy compiler and received an A+ in UCSB CS160 course!"
date: 2022-12-15
tag: 'others'
---
- [Lexer](#lexer)
- [Parser](#parser)
- [Abstract Syntax Tree](#abstract-syntax-tree)
- [Semantic Analysis](#semantic-analysis)
- [Code Generation](#code-generation)
- [Example of this language](#example-of-this-language)


Completed a toy compiler and received an A+ in UCSB CS160 course!

Through the course of CS160, I completed a Lexer, Parser, Abstract Syntax Tree, Semantic Analysis, and Code Generation to x86 Assembly in my project, which together make up a fully functional compiler.  

![compose](http://jinjinhe2001.github.io/images/compiler/compose.jpg)

## Lexer

I write a Flex specification for all the tokens in the language, which will be used by the parser. A Flex specification is made up of rules, which are a regular expression to match as well as a block of C code that should return a token for that expression.  

Here's a part of my lexer specification.
<html>
<style>
    .mac {
        width:10px;
        height:10px;
        border-radius:5px;
        float:left;
        margin:10px 0 0 5px;
    }
    .b1 {
        background:#E0443E;
        margin-left: 10px;
    }
    .b2 { background:#DEA123; }
    .b3 { background:#1AAB29; }
    .warpper{
        background:#121212;
        border-radius:5px;
        width:100%;
    }
</style>
<div class="warpper">
    <div class="mac b1"></div>
    <div class="mac b2"></div>
    <div class="mac b3"></div>


```
// lexer.l
NUMBER [1-9][0-9]*|0
ID [a-zA-Z][a-zA-Z0-9]* 
<COMMENT>[^*\n]*        
<COMMENT>"*"+[^*/\n]*   
<COMMENT>\n             
<COMMENT>"*"+"/"        BEGIN(INITIAL);
<COMMENT><<EOF>>  { yyerror("comment end with eof"); }

"if"              { return T_IF; }
"else"            { return T_ELSE; }
"while"           { return T_WHILE; }
"do"              { return T_DO; }
"print"           { return T_PRINT; }
...
")"               { return T_RP; }
":"               { return T_COLON; }
";"               { return T_SEMICOL; }
","               { return T_COMMA; }
"."               { return T_DOT; }


{NUMBER}          { yylval.base_int = std::atoi(yytext) ; return T_NUMBER; }
{ID}              { yylval.base_char_ptr = new char(); strcpy(yylval.base_char_ptr, yytext) ; return T_ID; }
```
</div>
<br>
</html>
## Parser
For parser, I write a Bison specification for the language grammar, which will be used to parse the input. A Bison specification is made of a list of tokens, precedence/associativity specifiers, and a grammar.  

Here's a part of my Bison code. **From this you can see the Grammar defination of this language.**
```
// parser.y

Start : Classes
      ;

Classes : Class Classes
        | Class
        ;

Class : T_ID T_EXTENDS T_ID T_LC ClassBody T_RC
      | T_ID T_LC ClassBody T_RC
      ;

ClassBody : Members Methods
          ;

Members : Members Member
        | %empty
        ;

Member : Type T_ID T_SEMICOL
        ;

Type : T_INT
      | T_BOOLEAN
      | T_ID
      | T_NONE

Methods : Method Methods
        | %empty
        ;

Method : T_ID T_LP Parameters T_RP T_ARROW Type T_LC MethodBody T_RC
        ;

Parameters : Parameter
            | %empty
            ;

Parameter : Type T_ID
          | Type T_ID T_COMMA Parameter
          ;

MethodBody : Declarations Statements ReturnStatement
            ;

Declarations : Declarations Declaration
              | %empty
              ;

Declaration : Type Declaration_ T_SEMICOL
            ;

Declaration_ : T_ID
              | T_ID T_COMMA Declaration_
              ;

Statements : Statement Statements
            | %empty
            ;

Statement : Assignment
          | MethodCall T_SEMICOL
          | IfElse
          | WhileLoop
          | DoWhile
          | Print

Assignment : T_ID T_EQUAL Expression T_SEMICOL
            | T_ID T_DOT T_ID T_EQUAL Expression T_SEMICOL

IfElse : T_IF Expression T_LC Block T_RC
        | T_IF Expression T_LC Block T_RC T_ELSE T_LC Block T_RC
        ;

WhileLoop : T_WHILE Expression T_LC Block T_RC
          ;

DoWhile : T_DO T_LC Block T_RC T_WHILE T_LP Expression T_RP T_SEMICOL
        ;

Block : Statement Statements
      ;

Print : T_PRINT Expression T_SEMICOL
      ;

ReturnStatement : T_RETURN Expression T_SEMICOL
                | %empty
                ;

Expression : Expression T_PLUS Expression
            | Expression T_MINUS Expression
            | Expression T_MULT Expression
            | Expression T_DIVIDE Expression
            | Expression T_GREATER Expression
            | Expression T_GTOE Expression
            | Expression T_EQUALTO Expression
            | Expression T_AND Expression
            | Expression T_OR Expression 
            | T_NOT Expression
            | Expression T_QSMARK Expression T_COLON Expression %prec T_TERNARYOP
            | T_MINUS Expression %prec T_UNARYMINUS
            | T_ID 
            | T_ID T_DOT T_ID
            | MethodCall
            | T_LP Expression T_RP
            | T_NUMBER
            | T_TRUE
            | T_FALSE
            | T_NEW T_ID
            | T_NEW T_ID T_LP Arguments T_RP
            ;

MethodCall : T_ID T_LP Arguments T_RP
            | T_ID T_DOT T_ID T_LP Arguments T_RP
            ;

Arguments : Arguments_
          | %empty
          ;

Arguments_ : Expression T_COMMA Arguments_
            | Expression
            ;
```  
## Abstract Syntax Tree

I built ASTs for programs in this language using syntax-directed translation with Bison actions. ASTs are a form of intermediate representation which are extremely useful in the compilation process. They abstract the program and remove useless information, while still preserving the complete and exact program structure.

Here's code of Expression's AST building code.

```
// parser.y
Expression : Expression T_PLUS Expression     {$$ = new PlusNode($1, $3);}
            | Expression T_MINUS Expression   {$$ = new MinusNode($1, $3);}
            | Expression T_MULT Expression    {$$ = new TimesNode($1, $3);}
            | Expression T_DIVIDE Expression  {$$ = new DivideNode($1, $3);}
            | Expression T_GREATER Expression {$$ = new GreaterNode($1, $3);}
            | Expression T_GTOE Expression    {$$ = new GreaterEqualNode($1, $3);}
            | Expression T_EQUALTO Expression {$$ = new EqualNode($1, $3);}
            | Expression T_AND Expression     {$$ = new AndNode($1, $3);}
            | Expression T_OR Expression      {$$ = new OrNode($1, $3);}
            | T_NOT Expression                {$$ = new NotNode($2);}
            | Expression T_QSMARK Expression T_COLON Expression %prec T_TERNARYOP {$$ = new QMNode($1, $3, $5);}
            | T_MINUS Expression %prec T_UNARYMINUS {$$ = new NegationNode($2);}
            | T_ID                            {$$ = new VariableNode(new IdentifierNode($1));}
            | T_ID T_DOT T_ID                 {$$ = new MemberAccessNode(new IdentifierNode($1), new IdentifierNode($3));}
            | MethodCall                      {$$ = $1->methodcall;}
            | T_LP Expression T_RP            {$$ = $2;}
            | T_NUMBER                        {$$ = new IntegerLiteralNode(new IntegerNode($1));}
            | T_TRUE                          {$$ = new BooleanLiteralNode(new IntegerNode($1));}
            | T_FALSE                         {$$ = new BooleanLiteralNode(new IntegerNode($1));}
            | T_NEW T_ID                      {$$ = new NewNode(new IdentifierNode($2), new std::list<ExpressionNode*>());}
            | T_NEW T_ID T_LP Arguments T_RP  {$$ = new NewNode(new IdentifierNode($2), $4);}
            ;
```
## Semantic Analysis

I constructed a symbol table and perform type checking on input programs using the AST. The symbol table stores all necessary information about symbols (classes, methods, members, and variables) present and contains information necessary to type check and generate code. I then built on top of the symbol table generation and perform type checking on the input programs.  

In TypeCheck.h and TypeCheck.cpp files, I writed code for TypeCheck visitor to build symbol table and type check the program.

```
// TypeCheck.h
typedef struct compoundtype {
    BaseType baseType;
    std::string objectClassName;
} CompoundType;

typedef struct variableinfo {
    CompoundType type;
    int offset;
    int size;
} VariableInfo;

typedef std::map<std::string, VariableInfo> VariableTable;

typedef struct methodinfo {
    CompoundType returnType;
    VariableTable *variables;
    std::list<CompoundType> *parameters;
    int localsSize;
} MethodInfo;

typedef std::map<std::string, MethodInfo> MethodTable;

typedef struct classinfo {
    std::string superClassName;
    MethodTable *methods;
    VariableTable *members;
    int membersSize;
} ClassInfo;
...
// All the visitor functions. You will need to write
// appropriate implementation in the typecheck.cpp file.
virtual void visitProgramNode(ProgramNode* node);
virtual void visitClassNode(ClassNode* node);
virtual void visitMethodNode(MethodNode* node);
virtual void visitMethodBodyNode(MethodBodyNode* node);
virtual void visitParameterNode(ParameterNode* node);
virtual void visitDeclarationNode(DeclarationNode* node);
virtual void visitReturnStatementNode(ReturnStatementNode* node);
virtual void visitAssignmentNode(AssignmentNode* node);
...
```

```
// TypeCheck.cpp

void TypeCheck::visitProgramNode(ProgramNode* node) {
    classTable = new ClassTable();
    node->visit_children(this);

    if (classTable->count("Main") == 0) {
        typeError(no_main_class);
    } else if (classTable->at("Main").members->size() != 0) {
        typeError(main_class_members_present);
    } else if (classTable->at("Main").methods->count("main") == 0) {
        typeError(no_main_method);
    } else if (classTable->at("Main").methods->at("main").returnType.baseType != bt_none ||
                classTable->at("Main").methods->at("main").parameters->size() != 0) 
    {
        typeError(main_method_incorrect_signature);
    }
}

void TypeCheck::visitClassNode(ClassNode* node) {
    if (node->identifier_2 != nullptr && classTable->count(node->identifier_2->name) == 0) {
        typeError(undefined_class);
        return;
    }
    currentClassName = node->identifier_1->name;
    currentMethodTable = new MethodTable();
    currentVariableTable = new VariableTable();
    currentLocalOffset = 0;
    currentParameterOffset = 0;
    currentMemberOffset = 0;

    ClassInfo info;
    if (node->identifier_2 != nullptr) {
        ClassInfo extraInfo;
        info.superClassName = node->identifier_2->name;
        ClassInfo superClassInfo = (*classTable)[info.superClassName];
        MethodTable *superExtraMethodTable = new MethodTable();
        VariableTable *superExtraVariableTable = new VariableTable();
        for (std::pair<const std::string, VariableInfo> p : *superClassInfo.members) {
        (*superExtraVariableTable)[p.first] = p.second;
        }
        for (std::pair<const std::string, methodinfo> p: *superClassInfo.methods) {
        (*superExtraMethodTable)[p.first] = p.second;
        }
        if (superClassTable->count(info.superClassName + superSuffix) != 0) {
        ClassInfo superClassExtraInfo = (*superClassTable)[info.superClassName + superSuffix];
        for (std::pair<const std::string, VariableInfo> p : *superClassExtraInfo.members) {
            (*superExtraVariableTable)[p.first] = p.second;
        }
        for (std::pair<const std::string, methodinfo> p: *superClassExtraInfo.methods) {
            (*superExtraMethodTable)[p.first] = p.second;
        }
        }
        extraInfo.methods = superExtraMethodTable;
        extraInfo.members = superExtraVariableTable;
        (*superClassTable)[currentClassName + superSuffix] = extraInfo;
        currentMemberOffset = superExtraVariableTable->size() * 4;
    }
    
    info.methods = currentMethodTable;
    info.members = currentVariableTable;
    info.membersSize = currentMemberOffset;

    (*classTable)[currentClassName] = info;
    
    node->visit_children(this);
}
...
```

## Code Generation

Finally, we came to code generation. I generated executable x86 assembly code which will implement the input programs to the compiler. This will complete the process of compilation.  

The codegeneration.cpp and codegeneration.hpp files define the CodeGenerator visitor which will visit the AST and generate x86 Assembly code. Generating x86 Assembly code is done in the CodeGenerator visitor functions and they consist of printing the assembly to standard output.  

Here a part of CodeGenerator visitor functions. And The code generation for expressions implement a stack machine.

```
// codegeneration.cpp
...
void CodeGenerator::visitProgramNode(ProgramNode* node) {
    std::cout << ".data" << std::endl;
    std::cout << "printstr: .asciz \"%d\\n\"" << std::endl;
    std::cout << ".text" << std::endl;
    std::cout << ".globl Main_main" << std::endl;
    node->visit_children(this);
}
...
void CodeGenerator::visitMethodBodyNode(MethodBodyNode* node) {
    std::cout << "  push %ebp" << std::endl;
    std::cout << "  mov %esp, %ebp" << std::endl;
    if (currentMethodInfo.localsSize != 0) {
        std::cout << "  sub $" << std::to_string(currentMethodInfo.localsSize) << ", %esp" << std::endl;
    }
    std::cout << "  push %ebx" << std::endl;
    std::cout << "  push %esi" << std::endl;
    std::cout << "  push %edi" << std::endl;
    
    node->visit_children(this);

    std::cout << "  pop %edi" << std::endl;
    std::cout << "  pop %esi" << std::endl;
    std::cout << "  pop %ebx" << std::endl;
    std::cout << "  mov %ebp, %esp" << std::endl;
    std::cout << "  pop %ebp" << std::endl;
    std::cout << "  ret" << std::endl;
}
...

void CodeGenerator::visitIfElseNode(IfElseNode* node) {
    node->expression->accept(this);
    nextLabel();

    const std::string elseLabel = "EL" + std::to_string(currentLabel);
    const std::string endLabel = "END" + std::to_string(currentLabel);
    std::cout << "  pop %eax" << std::endl;
    std::cout << "  cmp $0, %eax" << std::endl;
    std::cout << "  je " + elseLabel << std::endl;

    if (node->statement_list_1) {
        for (auto statement : *node->statement_list_1) {
            statement->accept(this);
        }
    }

    std::cout << "  jmp " + endLabel << std::endl;
    std::cout << elseLabel + ":" << std::endl;

    if (node->statement_list_2) {
        for (auto statement : *node->statement_list_2) {
            statement->accept(this);
        }
    }

    std::cout << endLabel + ":" << std::endl;
}
...
void CodeGenerator::visitPlusNode(PlusNode* node) {
    node->visit_children(this);
    std::cout << "  pop %edx" << std::endl;
    std::cout << "  pop %eax" << std::endl;
    std::cout << "  add %edx, %eax" << std::endl;
    std::cout << "  push %eax" << std::endl;
}
...
```

## Example of this language
```
classA {
     int x;
     int y;

     classA(int xarg, int yarg) -> none {
         x = xarg;
	 y = yarg;
     }
     inc() -> none {
         x = x * 2;
	 y = y + 1;
     }
}

Main {
     main() -> none {
     	    classA a;
	    int i;

	    a = new classA(3, 4);
	    print a.x;
	    print a.y;

	    a.inc();

	    print a.x * a.y;
     }
}
```
x86 Assembly code Translated through my compiler
```
.data
printstr: .asciz "%d\n"
.text
.globl Main_main
classA_classA:
  push %ebp
  mov %esp, %ebp
  push %ebx
  push %esi
  push %edi
  mov 12(%ebp), %eax
  push %eax
  pop %eax
  mov 8(%ebp), %edx
  mov %eax, 0(%edx)
  mov 16(%ebp), %eax
  push %eax
  pop %eax
  mov 8(%ebp), %edx
  mov %eax, 4(%edx)
  pop %edi
  pop %esi
  pop %ebx
  mov %ebp, %esp
  pop %ebp
  ret
classA_inc:
  push %ebp
  mov %esp, %ebp
  push %ebx
  push %esi
  push %edi
  mov 8(%ebp), %edx
  mov 0(%edx), %eax
  push %eax
  push $2
  pop %edx
  pop %eax
  imul %edx, %eax
  push %eax
  pop %eax
  mov 8(%ebp), %edx
  mov %eax, 0(%edx)
  mov 8(%ebp), %edx
  mov 4(%edx), %eax
  push %eax
  push $1
  pop %edx
  pop %eax
  add %edx, %eax
  push %eax
  pop %eax
  mov 8(%ebp), %edx
  mov %eax, 4(%edx)
  pop %edi
  pop %esi
  pop %ebx
  mov %ebp, %esp
  pop %ebp
  ret
Main_main:
  push %ebp
  mov %esp, %ebp
  sub $8, %esp
  push %ebx
  push %esi
  push %edi
  push $4
  push $3
  push $8
  call malloc
  add $4, %esp
  push %eax
  call classA_classA
  pop %eax
  add $8, %esp
  push %eax
  pop %eax
  mov %eax, -4(%ebp)
  mov -4(%ebp), %edx
  mov 0(%edx), %eax
  push %eax
  push $printstr
  call printf
  add $8, %esp
  mov -4(%ebp), %edx
  mov 4(%edx), %eax
  push %eax
  push $printstr
  call printf
  add $8, %esp
  push -4(%ebp)
  call classA_inc
  add $4, %esp
  push %eax
  mov -4(%ebp), %edx
  mov 0(%edx), %eax
  push %eax
  mov -4(%ebp), %edx
  mov 4(%edx), %eax
  push %eax
  pop %edx
  pop %eax
  imul %edx, %eax
  push %eax
  push $printstr
  call printf
  add $8, %esp
  pop %edi
  pop %esi
  pop %ebx
  mov %ebp, %esp
  pop %ebp
  ret
```

**Due to academic integrity, I decide not to public my whole code of this project. You can email me if you are not attending this course**