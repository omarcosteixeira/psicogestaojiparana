import sys
import re

def check_balance_per_function(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # Simple regex to find functions and their return statements
    functions = re.finditer(r'function\s+(\w+)\s*\(.*?\)\s*\{', content, re.DOTALL)
    
    for match in functions:
        name = match.group(1)
        start_idx = match.start()
        
        # Find the end of this function by balancing braces
        brace_stack = 0
        end_idx = -1
        for i in range(start_idx, len(content)):
            if content[i] == '{':
                brace_stack += 1
            elif content[i] == '}':
                brace_stack -= 1
                if brace_stack == 0:
                    end_idx = i + 1
                    break
        
        if end_idx == -1:
            print(f"Function '{name}' never closed")
            continue
            
        function_body = content[start_idx:end_idx]
        
        # Check balance of () and [] inside this function
        stack = []
        for i, char in enumerate(function_body):
            if char in '([':
                stack.append((char, i))
            elif char in ')]':
                if not stack:
                    # Ignore extra closing if we are not sure about context
                    continue
                opening, oi = stack.pop()
                if (opening == '(' and char != ')') or \
                   (opening == '[' and char != ']'):
                    # print(f"Mismatch in '{name}': {opening} closed by {char}")
                    pass
        
        # Look for the return statement's JSX
        returns = re.finditer(r'return\s*\(', function_body)
        for ret in returns:
            ret_start = ret.start()
            # Balance the parenthesis of return (
            paren_stack = 0
            ret_end = -1
            for i in range(ret_start, len(function_body)):
                if function_body[i] == '(':
                    paren_stack += 1
                elif function_body[i] == ')':
                    paren_stack -= 1
                    if paren_stack == 0:
                        ret_end = i + 1
                        break
            
            if ret_end != -1:
                jsx = function_body[ret_start:ret_end]
                # Check tag balance in JSX
                tags = re.findall(r'<(/?[a-zA-Z0-9.]+)', jsx)
                tag_stack = []
                for tag in tags:
                    if tag.startswith('/'):
                        if not tag_stack:
                            print(f"Extra closing tag </{tag[1:]}> in '{name}'")
                        else:
                            opening = tag_stack.pop()
                            if opening != tag[1:]:
                                print(f"Mismatch in '{name}': <{opening}> closed by </{tag[1:]}>")
                    else:
                        # Ignore self-closing tags (simplified)
                        # We would need a more complex parser for that
                        if not any(jsx[ret_start + i:].startswith('/>') for i, t in enumerate(jsx) if t == tag):
                             tag_stack.append(tag)
                
                # We can't easily check for unclosed tags without a real parser
                # because of self-closing tags like <img />, <br /> etc.

if __name__ == "__main__":
    check_balance_per_function(sys.argv[1])
