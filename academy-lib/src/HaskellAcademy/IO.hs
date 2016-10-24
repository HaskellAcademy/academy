module HaskellAcademy.IO (
  putStr,
  putStrLn,
  print
  ) where

import Prelude hiding (print, putStr, putStrLn)
import GHCJS.Types (JSVal)
import GHCJS.Prim (toJSString)

foreign import javascript unsafe
  "document.write($1);"
  write :: JSVal -> IO ()

putStr :: String -> IO ()
putStr = putStrLn

putStrLn :: String -> IO ()
putStrLn = write . toJSString

print :: Show a => a -> IO ()
print = putStrLn . show
