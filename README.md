# linq-fast
### A TypeScript implementation of .NET Linq / Enumerable for deferred evaluation, focussed on speed

&nbsp;

Working versions of all Enumerable methods are implemented and the library is ready for use

Future updates will focus on performance enhancements and greater test coverage

&nbsp;

### Usage

&nbsp;

Usage is simple, to obtain a collection, wrap any Iterable with a call to the ```linq``` function and then chain additional methods as required, e.g.:

```
linq([1, 2, 3, 4, 5]).where(num => num >= 3).select(num => num + 1).toArray();

// [4, 5, 6] 
```

Use in any iterable context, e.g. a ```for``` loop

```
let collection = linq([1, 2, 3]);
let oddNumbers = collection.where(num => num % 2 === 1);

for(let item of oddNumbers) {
    console.log(item);
}
```

&nbsp;

### Dependencies

&nbsp;

No 3rd party libs, only the vanilla JS standard library (The test suite uses Jasmine)

This library can be used in browsers or NodeJS projects, some notes for older browser compatibility follow:

This library depends heavily on iterators and generator functions and uses lamda functions liberally, so in order to target some older browsers (*cough* IE *cough*) you will need to run through some kind of downlevelling compiler, i.e. Babel/TypeScript

The only other potential compatibility issue is that the ```longCount()``` method has return type of ```bigint``` which is not widely supported at the time of writing. ```bigint``` was used instead of ```number``` not only because it is a more appropriate substitute for the .NET ```long/int64``` data type, but also because just using ```number``` would make this method identical to ```count()```.
If you're having issues with an environment that doesn't support ```bigint```, avoid using this method or simply shim ```BigInt = Number``` and it should work for most use cases

&nbsp;

### Differences from .NET

&nbsp;

The method signatures are largely the same as their .NET counterparts, except that case has been changed to match JS conventions, differences are kept to a minimum and are due to limitations in the language/library:

&nbsp;

* ```Collection<T>``` instead of ```IEnumerable<T>```, this is to better signify what this version represents, an actual collection of objects with methods rather than an interface with extension methods

* ```toList()``` returns a JS array, which makes it identical in function to ```toArray()```, JS arrays are already similar to the .NET list type in that they can be dynamically resized. The ```toArray()``` method could have been mapped to a fixed-length array, but that would likely be unintuitive for most use cases.

* ```groupBy()```, ```toDictionary()```, ```toLookup()``` 
These methods all have multiple overloads with function parameters. Without any reliable way to detect which overload is being called, these have been overloaded with the most simple/common overloads staying the same and some parameters, usually a comparer, being encapsulated into an object parameter

* ```comparer``` Many methods take an optional comparer argument for custom equality checking, usually .NET types have built-in comparer options you can use or write your own. Here, these have been implemented as an optional callback function for determining equality, which defaults to the ```===``` operator if not provided.
There may be some "default" comparer logic implemented in the future but backwards compatibility with the existing approach will be maintained

* ```toHashSet()```, ```toDictionary()```, ```toLookup()``` - These methods make use of the .NET types ```HashSet<T>```, ```Dictionary<TKey, TValue>``` and ```Lookup<TKey, TValue>```, these have been mapped to their closest counterparts in JS, ```Set<T>```, ```Map<TKey, TValue>``` and ```Map<TKey, Collection<TValue>>``` respectively. It is worth noting that these objects differ slightly from their .NET counterparts and although a custom ```comparer``` can be provided for the latter two, this will only be used in the construction of the ```Map``` which does not support this itself. Also it is worth noting that in order to use more ```Collection``` functions on these objects, you will need to wrap an iterable with the ```linq()``` function again, as these native objects do not have innate support for this library